import { ConditionalVisibilityEffectDefinitions } from '../conditional-visibility-effect-definition';
import {
  AtcvEffectSenseFlags,
  AtcvEffectConditionFlags,
  SenseData,
  CVSkillData,
} from '../conditional-visibility-models';
import CONSTANTS from '../constants';
import type Effect from '../effects/effect';

export default {
  HP_ATTRIBUTE: `data.attributes.hp.value`,
  PERCEPTION_PASSIVE_SKILL: `data.skills.prc.passive`,
  STEALTH_PASSIVE_SKILL: `data.skills.ste.passive`,
  STEALTH_ACTIVE_SKILL: `data.skills.ste.total`,
  // STEALTH_ID_SKILL: `ste`,
  STEALTH_ID_LANG_SKILL: `DND5E.SkillSte`,
  PATH_ATTRIBUTES_SENSES: `data.attributes.senses`,
  NPC_TYPE: `npc`,
  /**
   * The set of possible sensory perception types which an Actor may have.
   * @enum {string}
   */
  SENSES: <SenseData[]>[
    // {
    //   id: `stealthpassive`,
    //   name: `${CONSTANTS.MODULE_NAME}.stealthpassive`),
    //   //path: `data.skills.ste.passive`,
    //   path: `data.attributes.senses.stealthpassive`,
    //   img: ``,
    //   //effect: EffectDefinitions.stealthpassive(0),
    // },
    {
      id: AtcvEffectSenseFlags.NONE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.NONE}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_01.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.NORMAL,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.NORMAL}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_02.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.BLINDED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.BLINDED}`,
      path: `data.traits.senses.blinded`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/affliction_24.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: true,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.DARKVISION,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.DARKVISION}`,
      path: `data.attributes.senses.darkvision`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/evil-eye-red-1.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.TREMOR_SENSE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.TREMOR_SENSE}`,
      path: `data.attributes.senses.tremorsense`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/ice_15.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: true,
      conditionBlinded: false,
      conditionBlindedOverride: true,
    },
    {
      id: AtcvEffectSenseFlags.SEE_INVISIBLE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.SEE_INVISIBLE}`,
      path: `data.attributes.senses.seeinvisible`, // data.attributes.senses.special
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/shadow_11.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.BLIND_SIGHT,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.BLIND_SIGHT}`,
      path: `data.attributes.senses.blindsight`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/green_18.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: true,
    },
    {
      id: AtcvEffectSenseFlags.TRUE_SIGHT,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.TRUE_SIGHT}`,
      path: `data.attributes.senses.truesight`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/emerald_11.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.DEVILS_SIGHT,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.DEVILS_SIGHT}`,
      path: `data.attributes.senses.devilssight`, // data.attributes.senses.special
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/blue_17.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    // Skills sense
    {
      id: 'perception',
      name: 'DND5E.SkillPrc',
      path: ``,
      img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
  ],
  CONDITIONS: <SenseData[]>[
    {
      id: AtcvEffectConditionFlags.NONE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.NONE}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_01.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.STEALTHED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.STEALTHED}`,
      path: ``, //`data.skills.ste.passive`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/blue_35.jpg`,
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.HIDDEN,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.HIDDEN}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/newspaper.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.INVISIBLE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.INVISIBLE}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/unknown.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[
        AtcvEffectSenseFlags.BLIND_SIGHT,
        AtcvEffectSenseFlags.SEE_INVISIBLE,
        AtcvEffectSenseFlags.TREMOR_SENSE,
        AtcvEffectSenseFlags.TRUE_SIGHT,
      ],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.OBSCURED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.OBSCURED}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/foggy.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[AtcvEffectSenseFlags.BLIND_SIGHT, AtcvEffectSenseFlags.TREMOR_SENSE],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.IN_DARKNESS,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.IN_DARKNESS}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/moon.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[
        AtcvEffectSenseFlags.BLIND_SIGHT,
        AtcvEffectSenseFlags.TREMOR_SENSE,
        AtcvEffectSenseFlags.DEVILS_SIGHT,
        AtcvEffectSenseFlags.TRUE_SIGHT,
      ],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    // Skills condition
    {
      id: 'stealth',
      name: 'DND5E.SkillSte',
      path: ``,
      img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
      conditionType: 'condition',
      conditionSources: <string[]>['perception'],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
  ],
  EFFECTS: <Effect[]>[],
  SKILLS: <CVSkillData[]>[
    {
      id: 'acrobatics',
      name: 'DND5E.SkillAcr',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/acrobatics.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'animal_handling',
      name: 'DND5E.SkillAni',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/animal_handling.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'arcana',
      name: 'DND5E.SkillArc',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/arcana.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'athletics',
      name: 'DND5E.SkillAth',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/athletics.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'deception',
      name: 'DND5E.SkillDec',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/deception.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'history',
      name: 'DND5E.SkillHis',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/history.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'insight',
      name: 'DND5E.SkillIns',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/insight.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'intimidation',
      name: 'DND5E.SkillItm',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/intimidation.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'investigation',
      name: 'DND5E.SkillInv',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/investigation.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'medicine',
      name: 'DND5E.SkillMed',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/medicine.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'nature',
      name: 'DND5E.SkillNat',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/nature.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'perception',
      name: 'DND5E.SkillPrc',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
      enable: true,
      senseData: {
        id: 'perception',
        name: 'DND5E.SkillPrc',
        path: ``,
        img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
        conditionType: 'sense',
        conditionSources: <string[]>[],
        conditionTargets: <string[]>[],
        conditionElevation: false,
        conditionBlinded: false,
        conditionBlindedOverride: false,
      },
    },
    {
      id: 'performance',
      name: 'DND5E.SkillPrf',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/performance.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'persuasion',
      name: 'DND5E.SkillPer',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/persuasion.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'religion',
      name: 'DND5E.SkillRel',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/religion.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'sleight_of_hand',
      name: 'DND5E.SkillSlt',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/sleight_of_hand.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'stealth',
      name: 'DND5E.SkillSte',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
      enable: true,
      senseData: {
        id: 'stealth',
        name: 'DND5E.SkillSte',
        path: ``,
        img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
        conditionType: 'condition',
        conditionSources: <string[]>['perception'],
        conditionTargets: <string[]>[],
        conditionElevation: false,
        conditionBlinded: false,
        conditionBlindedOverride: false,
      },
    },
    {
      id: 'survival',
      name: 'DND5E.SkillSur',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/survival.svg`,
      enable: false,
      senseData: null,
    },
  ],
};
