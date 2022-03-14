import { EffectChangeData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/effectChangeData';
import { ActiveEffectData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs';
/* eslint-disable prefer-const */
import API from './api';
import CONSTANTS from './constants';
import Effect from './effects/effect';
import {
  error,
  retrieveAtcvVisionLevelDistanceFromActiveEffect,
  i18n,
  retrieveAtcvTargetsFromActiveEffect,
  retrieveAtcvElevationFromActiveEffect,
  retrieveAtcvSourcesFromActiveEffect,
  retrieveAtcvVisionLevelValueFromActiveEffect,
  retrieveAtcvVisionTargetImageFromActiveEffect,
  retrieveAtcvTypeFromActiveEffect,
  getSensesFromToken,
  getConditionsFromToken,
  isStringEquals,
  retrieveAtcvLevelMaxIndexFromActiveEffect,
  retrieveAtcvLevelMinIndexFromActiveEffect,
} from './lib/lib';

export interface AtcvEffect {
  visionId: string;
  visionName: string;
  visionElevation: boolean;
  // statusSight: SenseData | undefined;
  visionLevelValue: number | undefined;
  visionDistanceValue: number | undefined;
  visionTargets: string[];
  visionSources: string[];
  visionTargetImage: string;
  visionType: string;
  visionLevelMinIndex: number;
  visionLevelMaxIndex: number;
}

export class AtcvEffectFlagData {
  visionLevelValue: number | undefined;
  visionDistanceValue: number | undefined;
  visionElevation: boolean;
  visionSources: string[];
  visionTargets: string[];
  visionTargetImage: string;
  visionType: string;
  visionLevelMinIndex: number;
  visionLevelMaxIndex: number;

  constructor() {}

  static fromAtcvEffect(atcvEffect: AtcvEffect) {
    const res = new AtcvEffectFlagData();
    res.visionLevelValue = atcvEffect.visionLevelValue;
    res.visionDistanceValue = atcvEffect.visionDistanceValue;
    res.visionElevation = atcvEffect.visionElevation;
    res.visionSources = atcvEffect.visionSources;
    res.visionTargets = atcvEffect.visionTargets;
    res.visionTargetImage = atcvEffect.visionTargetImage;
    res.visionType = atcvEffect.visionType;
    res.visionLevelMinIndex = atcvEffect.visionLevelMinIndex;
    res.visionLevelMaxIndex = atcvEffect.visionLevelMaxIndex;
    return res;
  }

  static fromEffect(effect: Effect) {
    const effectChanges = effect._handleIntegrations();
    const res = new AtcvEffectFlagData();
    res.visionLevelValue = retrieveAtcvVisionLevelValueFromActiveEffect(effectChanges);
    res.visionDistanceValue = retrieveAtcvVisionLevelDistanceFromActiveEffect(effectChanges);
    res.visionElevation = retrieveAtcvElevationFromActiveEffect(effectChanges);
    res.visionSources = retrieveAtcvSourcesFromActiveEffect(effectChanges);
    res.visionTargets = retrieveAtcvTargetsFromActiveEffect(effectChanges);
    res.visionTargetImage = retrieveAtcvVisionTargetImageFromActiveEffect(effectChanges);
    res.visionType = retrieveAtcvTypeFromActiveEffect(effectChanges);
    res.visionLevelMinIndex = retrieveAtcvLevelMinIndexFromActiveEffect(effectChanges)
    res.visionLevelMaxIndex = retrieveAtcvLevelMaxIndexFromActiveEffect(effectChanges)
    return res;
  }

  static fromActiveEffect(activeEffect: ActiveEffect) {
    const effectChanges = activeEffect.data.changes;
    const res = new AtcvEffectFlagData();
    res.visionLevelValue = retrieveAtcvVisionLevelValueFromActiveEffect(effectChanges);
    res.visionDistanceValue = retrieveAtcvVisionLevelDistanceFromActiveEffect(effectChanges);
    res.visionElevation = retrieveAtcvElevationFromActiveEffect(effectChanges);
    res.visionSources = retrieveAtcvSourcesFromActiveEffect(effectChanges);
    res.visionTargets = retrieveAtcvTargetsFromActiveEffect(effectChanges);
    res.visionTargetImage = retrieveAtcvVisionTargetImageFromActiveEffect(effectChanges);
    res.visionType = retrieveAtcvTypeFromActiveEffect(effectChanges);
    res.visionLevelMinIndex = retrieveAtcvLevelMinIndexFromActiveEffect(effectChanges)
    res.visionLevelMaxIndex = retrieveAtcvLevelMaxIndexFromActiveEffect(effectChanges)
    return res;
  }
}

export interface SenseData {
  id: string; // This is the unique id used for sync all the senses and conditions (please no strange character, no whitespace and all in lowercase...)
  name: string; // This is the unique name used for sync all the senses and conditions (here you cna put any dirty character you want)
  path: string; // This is the path to the property you want to associate with this sense e.g. data.skills.prc.passive
  img: string; // [OPTIONAL] Image to associate to this sense
  visionLevelMinIndex: number; // [OPTIONAL] check a min index for filter a range of sense can see these conditions, or viceversa conditions can be seen only from this sense
  visionLevelMaxIndex: number; // [OPTIONAL] check a max index for filter a range of sense can see these conditions, or viceversa conditions can be seen only from this sense
  conditionElevation: boolean; // [OPTIONAL] force to check the elevation between the source token and the target token, useful when using module like 'Levels'
  conditionTargets: string[]; // [OPTIONAL] force to apply the check only for these sources (you can set this but is used only from sense)
  conditionSources: string[]; // [OPTIONAL] force to apply the check only for these sources (you can set this but is used only from condition)
  conditionTargetImage: string; // [OPTIONAL] string path to the image applied on target token and used from the source token (the one you click on) for replace only for that player with a special sight
  conditionDistance: number; // [OPTIONAL] set a maximum distance for check the sight with this effect
  conditionType:string; // indicate the type of CV usually they are or 'sense' or 'condition' not both, **THIS IS ESSENTIAL FOR USE SENSE AND CONDITION NOT REGISTERED ON THE MODULE IF NOT FOUNDED BY DEFAULT IS CONSIDERED A SENSE**, so now you can just modify the AE and you are not forced to call the registered macro of the module CV, this is very useful for integration with other modules.
}

export enum AtcvEffectSenseFlags {
  // additional generic
  NONE = 'none',
  NORMAL = 'normal',
  // additional dnd5e and pf2e
  DARKVISION = 'darkvision',
  SEE_INVISIBLE = 'seeinvisible',
  BLIND_SIGHT = 'blindsight',
  TREMOR_SENSE = 'tremorsense',
  TRUE_SIGHT = 'truesight',
  DEVILS_SIGHT = 'devilssight',
  // PASSIVE_STEALTH = '_ste',
  // PASSIVE_PERCEPTION = '_prc',
  // additional PF2E
  GREATER_DARKVISION = 'greaterdarkvision',
  LOW_LIGHT_VISION = 'lowlightvision',
  BLINDED = 'blinded',
}

export enum AtcvEffectConditionFlags {
  NONE = 'none',
  INVISIBLE = 'invisible',
  OBSCURED = 'obscured',
  IN_DARKNESS = 'indarkness',
  HIDDEN = 'hidden',
  IN_MAGICAL_DARKNESS = 'inmagicaldarkness',
}

/**
 * This is system indipendent utility class
 */
export class VisionCapabilities {

  senses: Map<string, AtcvEffect>;
  conditions: Map<string, AtcvEffect>;
  token: Token;

  constructor(srcToken: Token) {
    if (srcToken) {
      this.token = srcToken;
      this.senses = new Map<string, AtcvEffect>();
      this.conditions = new Map<string, AtcvEffect>();
      // SENSES
      this.addSenses();

      // CONDITIONS
      this.addConditions();

      getSensesFromToken(srcToken).forEach((sense: AtcvEffect) => {
        if(sense.visionType === 'sense' && !this.senses.has(sense.visionId)){
          this.senses.set(sense.visionId,sense);
        }
      });
      getConditionsFromToken(srcToken).forEach((condition: AtcvEffect) => {
        if(condition.visionType === 'condition' && !this.senses.has(condition.visionId)){
          this.senses.set(condition.visionId,condition);
        }
      });

    } else {
      error('No token found for get the visual capatibilities');
    }
  }

  hasSenses() {
    if (this.senses.size > 0) {
      return true;
    } else {
      return false;
    }
  }

  hasConditions() {
    if (this.conditions.size > 0) {
      return true;
    } else {
      return false;
    }
  }

  retrieveSenses() {
    const sensesTmp = new Map<string, AtcvEffect>();
    for (const [key, value] of this.senses.entries()) {
      if (value.visionLevelValue && value.visionLevelValue != 0) {
        sensesTmp.set(key, value);
      }
    }

    return sensesTmp;
  }

  // async refreshSenses() {
  //   for (const [key, value] of this.senses.entries()) {
  //     // const statusSight = value.statusSight;
  //     // const visionLevelValue = value.visionLevelValue;
  //     //await this.token.document.setFlag(CONSTANTS.MODULE_NAME, key, visionLevelValue);
  //     const atcvEffectFlagData = AtcvEffectFlagData.fromAtcvEffect(value);
  //     await this.token.document.setFlag(CONSTANTS.MODULE_NAME, key, atcvEffectFlagData);
  //     if (value.statusSight?.path) {
  //       setProperty(this.token, <string>value.statusSight?.path, value.visionLevelValue);
  //     }
  //   }
  // }

  // retrieveSenseValue(statusSense: string): number | undefined {
  //   let sense: number | undefined = undefined;
  //   for (const statusEffect of this.senses.values()) {
  //     const statusSight = <SenseData>statusEffect.statusSight;
  //     if (statusSense == statusSight.id) {
  //       sense = this.senses.get(statusSense)?.visionLevelValue;
  //       break;
  //     }
  //   }
  //   return sense;
  // }

  addSenses() {
    Promise.all(
      API.SENSES.map(async (statusSight) => {
        const atcvEffectFlagData = <AtcvEffectFlagData>(
          this.token?.document?.getFlag(CONSTANTS.MODULE_NAME, statusSight.id)
        );
        if (atcvEffectFlagData) {
          let visionLevelValue = atcvEffectFlagData.visionLevelValue || 0;
          let visionDistanceValue = atcvEffectFlagData.visionDistanceValue || 0;
          let conditionElevation = atcvEffectFlagData.visionElevation || false;
          let conditionTargets: string[] = atcvEffectFlagData.visionTargets || [];
          let conditionSources: string[] = atcvEffectFlagData.visionSources || [];
          let conditionTargetImage = atcvEffectFlagData.visionTargetImage || '';
          let conditionType = atcvEffectFlagData.visionType || 'sense';
          let conditionLevelMinIndex = atcvEffectFlagData.visionLevelMinIndex || 0;
          let conditionLevelMaxIndex = atcvEffectFlagData.visionLevelMaxIndex || 10;

          const statusEffect = <AtcvEffect>{
            visionId: statusSight.id,
            visionName: statusSight.name,
            visionElevation: conditionElevation ?? false,
            visionTargets: conditionTargets ?? [],
            visionSources: conditionSources ?? [],
            visionLevelValue: visionLevelValue ?? 0,
            visionDistanceValue: visionDistanceValue ?? 0,
            visionTargetImage: conditionTargetImage ?? '',
            // statusSight: statusSight,
            visionType: conditionType,
            visionLevelMinIndex: conditionLevelMinIndex,
            visionLevelMaxIndex: conditionLevelMaxIndex
          };
          this.senses.set(statusSight.id, statusEffect);
        }
      }),
    );
  }

  retrieveConditions() {
    const coditionsTmp = new Map<string, AtcvEffect>();
    for (const [key, value] of this.conditions.entries()) {
      if (value.visionLevelValue && value.visionLevelValue != 0) {
        coditionsTmp.set(key, value);
      }
    }
    return coditionsTmp;
  }

  // async refreshConditions() {
  //   for (const [key, value] of this.conditions.entries()) {
  //     //const statusSight = value.statusSight;
  //     // const visionLevelValue = value.visionLevelValue;
  //     // await this.token.document.setFlag(CONSTANTS.MODULE_NAME, key, visionLevelValue);
  //     const atcvEffectFlagData = AtcvEffectFlagData.fromAtcvEffect(value);
  //     await this.token.document.setFlag(CONSTANTS.MODULE_NAME, key, atcvEffectFlagData);
  //     if (value.statusSight?.path) {
  //       setProperty(this.token, <string>value.statusSight?.path, value.visionLevelValue);
  //     }
  //   }
  // }

  addConditions() {
    Promise.all(
      API.CONDITIONS.map(async (statusSight) => {
        const atcvEffectFlagData = <AtcvEffectFlagData>(
          this.token.document?.getFlag(CONSTANTS.MODULE_NAME, statusSight.id)
        );
        if (atcvEffectFlagData) {
          let visionLevelValue = atcvEffectFlagData.visionLevelValue || 0;
          let visionDistanceValue = atcvEffectFlagData.visionDistanceValue || 0;
          let conditionElevation = atcvEffectFlagData.visionElevation || false;
          let conditionTargets: string[] = atcvEffectFlagData.visionTargets || [];
          let conditionSources: string[] = atcvEffectFlagData.visionSources || [];
          let conditionTargetImage = atcvEffectFlagData.visionTargetImage || '';
          let conditionType = atcvEffectFlagData.visionType || 'condition';
          let conditionLevelMinIndex = atcvEffectFlagData.visionLevelMinIndex || 0;
          let conditionLevelMaxIndex = atcvEffectFlagData.visionLevelMaxIndex || 10;

          const statusEffect = <AtcvEffect>{
            visionId: statusSight.id,
            visionName: statusSight.name,
            visionElevation: conditionElevation ?? false,
            visionTargets: conditionTargets ?? [],
            visionSources: conditionSources ?? [],
            visionLevelValue: visionLevelValue ?? 0,
            visionDistanceValue: visionDistanceValue ?? 0,
            visionTargetImage: conditionTargetImage ?? '',
            // statusSight: statusSight,
            visionType: conditionType,
            visionLevelMinIndex: conditionLevelMinIndex,
            visionLevelMaxIndex: conditionLevelMaxIndex
          };
          this.conditions.set(statusSight.id, statusEffect);
        }
      }),
    );
  }

  // retrieveConditionValue(statusSense: string): number | undefined {
  //   let sense: number | undefined = undefined;
  //   for (const statusEffect of this.conditions.values()) {
  //     const statusSight = <SenseData>statusEffect.statusSight;
  //     if (statusSense == statusSight.id) {
  //       sense = this.senses.get(statusSense)?.visionLevelValue;
  //       break;
  //     }
  //   }
  //   return sense;
  // }
}
