<template>
  <q-list class="q-mt-md">
    <q-expansion-item
      v-for="item in compositionPartys()"
      :key="item"
      expand-separator
    >
      <template v-slot:header>
        <q-item-section>
          <div class="flex justify-between">
            <div class="text-weight-bolder" style="margin-right: 2px">
              <span v-if="item.alliance"> [{{ item.alliance }}]</span>
              <span> {{ item.guildName }} </span>
            </div>
            <div>
              <span>{{ formatNumber(item.fame) }} TOTAL FAME</span>
            </div>
          </div>
        </q-item-section>
      </template>
      <div class="container-weapons q-pt-md q-pb-md">
        <div class="player-weapon" v-for="weapon in item.weapons" :key="weapon">
          <ItemRender
            :item-name="`T8_${weapon[0]}@0`"
            :item-quality="0"
            :item-count="0"
          />
          <span>{{ weapon[1] }}</span>
        </div>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<script>
import useFormatNumber from "../composables/useFormatNumber";
import ItemRender from "src/components/itemRender.vue";
export default {
  components: {
    ItemRender,
  },
  props: {
    arrayItems: { required: true },
    indexes: { rquired: true },
    typeShow: { required: true },
  },
  setup(props) {
    const { formatNumber } = useFormatNumber();
    const compositionPartys = () => {
      let members = props.indexes;
      const guildCounts = {};
      for (const member of props.arrayItems) {
        if (!guildCounts[member.id]) {
          guildCounts[member.id] = {
            guildName: member.name,
            alliance: member.alliance,
            fame: member.killFame,
            weapons: {},
          };
        }
      }
      if (props.typeShow) {
        for (const guildId in guildCounts) {
          for (const member of members.filter((m) => m.guildId === guildId)) {
            let weaponType;
            if (member.equipment && member.equipment.mainhand !== null) {
              if (
                member.equipment.mainhand.length >= 2 &&
                member.equipment.mainhand[
                  member.equipment.mainhand.length - 2
                ] === "@"
              ) {
                weaponType = member.equipment.mainhand.slice(3, -2);
              } else {
                weaponType = member.equipment.mainhand.slice(3);
              }
              guildCounts[guildId]["weapons"][weaponType] =
                (guildCounts[guildId]["weapons"][weaponType] || 0) + 1;
            }
          }
          guildCounts[guildId]["weapons"] = Object.entries(
            guildCounts[guildId]["weapons"]
          ).sort((a, b) => b[1] - a[1]);
        }
      } else {
        for (const guildId in guildCounts) {
          for (const member of members.filter(
            (m) => m.allianceId === guildId
          )) {
            let weaponType;
            if (member.equipment && member.equipment.mainhand !== null) {
              if (
                member.equipment.mainhand.length >= 2 &&
                member.equipment.mainhand[
                  member.equipment.mainhand.length - 2
                ] === "@"
              ) {
                weaponType = member.equipment.mainhand.slice(3, -2);
              } else {
                weaponType = member.equipment.mainhand.slice(3);
              }
              guildCounts[guildId]["weapons"][weaponType] =
                (guildCounts[guildId]["weapons"][weaponType] || 0) + 1;
            }
          }
          guildCounts[guildId]["weapons"] = Object.entries(
            guildCounts[guildId]["weapons"]
          ).sort((a, b) => b[1] - a[1]);
        }
      }
      return guildCounts;
    };
    return { compositionPartys, formatNumber };
  },
};
</script>

<style lang="scss" scoped>
.q-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.container-weapons {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(80px, 0));
  justify-content: flex-start;
  justify-items: center;
}
.player-weapon {
  display: flex;
  width: 65px;
  flex-direction: column;
  align-items: center;
}
</style>
