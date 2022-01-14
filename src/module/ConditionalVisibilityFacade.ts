import { i18nFormat, log } from '../conditional-visibility';
import { ConditionalVisibility } from './ConditionalVisibility';
import { CONDITIONAL_VISIBILITY_MODULE_NAME, StatusEffectSightFlags } from './settings';
import { ConditionalVisibilitySystem } from './systems/ConditionalVisibilitySystem';
import { game } from './settings';

export interface ConditionalVisibilityFacade {
  help(): void;
  setCondition(tokens: Array<Token>, condition: string, value: boolean): void;
  hide(tokens: Array<Token>, value?: number): void;
  unHide(tokens: Array<Token>): void;
}

/**
 * A class to expose macro-friendly messages on the window object.
 */
export class ConditionalVisibilityFacadeImpl implements ConditionalVisibilityFacade {
  readonly _mod: ConditionalVisibility;
  readonly _system: ConditionalVisibilitySystem;

  constructor(mod: ConditionalVisibility, system: ConditionalVisibilitySystem) {
    this._mod = mod;
    this._system = system;
    this.toggleEffect = (token, condition) => {
      return token.toggleEffect(condition);
    };
  }

  help(): void {
    if (game.user?.isGM) {
      const conditions: any[] = [];
      this._system.effectsByCondition().forEach((value, key) => {
        conditions.push({ name: key, icon: value.icon });
      });
      renderTemplate(`modules/${CONDITIONAL_VISIBILITY_MODULE_NAME}/templates/help_dialog.html`, {
        gamesystem: game.system.id,
        hasStealth: this._system.hasStealth(),
        autoStealth: game.settings.get(CONDITIONAL_VISIBILITY_MODULE_NAME, 'autoStealth'),
        conditions: conditions,
      }).then((content) => {
        const d = new Dialog({
          title: 'Conditional Visibility',
          content: content,
          buttons: {},
          close: () => log('This always is logged no matter which option is chosen'),
          default: '',
        });
        d.render(true);
      });
    }
  }

  /**
   * Sets a true false condition on tokens.  Will toggle the status effect on the token.
   * @param tokens the list of tokens to affect
   * @param condition the name of the condition
   * @param value true or false
   */
  setCondition(tokens: Array<Token>, condition: string, value: boolean): void {
    const status = this._system.effectsByCondition().get(condition);
    if (status) {
      const guard: Map<string, boolean> = new Map();
      tokens.forEach((token) => {
        if (token.document.owner) {
          if (!this.actorAlreadyAdjusted(token, guard)) {
            if (value !== true) {
              if (this.has(token, status)) {
                this.toggleEffect(token, status).then(() => {});
              }
            } else {
              if (!this.has(token, status)) {
                this.toggleEffect(token, status).then(() => {});
              }
            }
          }
        }
      });
    }
  }

  /**
   * Toggle a condition on a set of tokens.
   * @param tokens the tokens to affect
   * @param condition the string condition
   */
  toggleCondition(tokens: Array<Token>, condition: string): void {
    const status = this._system.effectsByCondition().get(condition);
    if (status) {
      const guard: Map<string, boolean> = new Map();
      tokens.forEach((token) => {
        if (token.document.owner) {
          if (!this.actorAlreadyAdjusted(token, guard)) {
            this.toggleEffect(token, status).then(() => {});
          }
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  actorAlreadyAdjusted(token: any, guard: Map<string, boolean>): boolean {
    if (token.data.actorLink === true) {
      const actorId = token?.actor?.data?._id;
      if (actorId) {
        if (guard.has(actorId)) {
          return true;
        }
        guard.set(actorId, true);
        return false;
      }
    }
    return false;
  }

  /**
   * Set the hide condition on the token, if the system supports it.
   * @param tokens the list of tokens to affect.
   * @param value an optional numeric value to set for all tokens.  If unsupplied, will roll the ability the system defines.
   */
  async hide(tokens: Array<Token>, value?: number): Promise<void> {
    if (!this._system.hasStealth()) {
      ui.notifications?.error(i18nFormat('conditional-visibility.stealth.not.supported', { sysid: game.system.id }));
      return;
    }
    if (this._system.effectsByCondition().has('hidden')) {
      const hidden = this._system.effectsByCondition().get('hidden');
      const guard: Map<string, boolean> = new Map();
      await tokens.forEach(async (token: Token) => {
        if (token.document.owner) {
          if (!this.actorAlreadyAdjusted(token, guard)) {
            let stealth;
            if (value) {
              stealth = value;
            } else {
              stealth = this._system.rollStealth(token).roll().total;
            }
            const tokenActor = <Actor>token.document.actor;
            if (this.has(token, hidden) === true) {
              //const update = { 'conditional-visibility': {} };
              //update[CONDITIONAL_VISIBILITY_MODULE_NAME][StatusEffectSightFlags.PASSIVE_STEALTH] = stealth;
              //await tokenActor.update({ flags: update });
              if (!tokenActor.data.flags) {
                tokenActor.data.flags = {};
              }
              if (!tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME]) {
                tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME] = {};
              }
              await tokenActor.setFlag(
                CONDITIONAL_VISIBILITY_MODULE_NAME,
                StatusEffectSightFlags.PASSIVE_STEALTH,
                stealth,
              );
            } else {
              if (!tokenActor.data.flags) {
                tokenActor.data.flags = {};
              }
              if (!tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME]) {
                tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME] = {};
              }
              await tokenActor.setFlag(
                CONDITIONAL_VISIBILITY_MODULE_NAME,
                StatusEffectSightFlags.PASSIVE_STEALTH,
                stealth,
              );
              // this.toggleEffect(token, hidden); // removed on foundry 9
              //@ts-ignore
              this.toggleCondition([token], hidden.visibilityId);
            }
          }
        }
      });
      await ConditionalVisibility.SOCKET.executeForEveryone('refresh');
    }
  }

  /**
   * Removes the hide condition from the set of tokens.
   * @param tokens the list of tokens to affect
   */
  unHide(tokens: Array<Token>): void {
    if (this._system.hasStealth()) {
      const hidden = this._system.effectsByCondition().get('hidden');
      const guard: Map<string, boolean> = new Map();
      tokens.forEach((token) => {
        if (token.document.owner) {
          if (!this.actorAlreadyAdjusted(token, guard)) {
            if (this.has(token, hidden)) {
              this.toggleEffect(token, hidden);
            }
          }
        }
      });
    }
  }

  /**
   * Toggle the hidden condition on systems that support it.
   * @param tokens the tokens to hide/unhide
   * @param value the optional value to use when hiding.  If ommitted, will roll stealth
   */
  async toggleHide(tokens: Array<Token>, value?: number): Promise<void> {
    if (this._system.hasStealth()) {
      const hidden = this._system.effectsByCondition().get('hidden');
      const guard: Map<string, boolean> = new Map();
      tokens.forEach(async (token) => {
        if (token.document.owner) {
          if (!this.actorAlreadyAdjusted(token, guard)) {
            let stealth;
            if (value) {
              stealth = value;
            } else {
              const roll = await this._system.rollStealth(token);
              stealth = roll.total;
            }
            if (this.has(token, hidden) === true) {
              this.toggleEffect(token, hidden);
            } else {
              const tokenActor = <Actor>token.document.actor;
              if (!tokenActor.data.flags) {
                tokenActor.data.flags = {};
              }
              if (!tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME]) {
                tokenActor.data.flags[CONDITIONAL_VISIBILITY_MODULE_NAME] = {};
              }
              await tokenActor.setFlag(
                CONDITIONAL_VISIBILITY_MODULE_NAME,
                StatusEffectSightFlags.PASSIVE_STEALTH,
                stealth,
              );
              this.toggleEffect(token, hidden);
            }
          }
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  toggleEffect(token: Token, condition: any): Promise<any> {
    return token.toggleEffect(condition);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  has(token: Token, condition: any): boolean {
    const flags: boolean | any = token.data.actorLink
      ? token.actor?.data?.flags[CONDITIONAL_VISIBILITY_MODULE_NAME]
      : token?.data?.flags[CONDITIONAL_VISIBILITY_MODULE_NAME] ?? false;
    if (flags) {
      return flags[condition.visibilityId] === true;
    } else {
      return false;
    }
  }
}
