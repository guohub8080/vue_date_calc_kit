<script setup lang="ts">
import {
  local_ref_today,
  local_const_today,
  reset_local_ref_today,
} from "../utils/gzt-local-time";
import { Dayjs } from "dayjs";
import { computed, ref } from "vue";
const emits = defineEmits<{
  (e: "reset_today"): void;
}>();
const props = defineProps<{
  date: Dayjs;
}>();

const reset_today = () => {
  emits("reset_today");
};

const is_today = () => {
  if (props.date.format("YYYYMMDD") === local_const_today.format("YYYYMMDD")) {
    return ["is_today"];
  } else {
    return ["is_today", "hide"];
  }
};
const chinese_day: any = computed(() => {
  const chinese_day = ["一", "二", "三", "四", "五", "六", "日"];
  return chinese_day[props.date.day()];
});

const get_percent = (num: number) => Math.round(num * 1000) / 10 + "%";

// 输出一年共多少周的函数
const weeks_in_year = computed(() => {
  if (props.date.startOf("day").isoWeeksInYear() > 1) {
    return props.date.isoWeeksInYear() + 1;
  } else {
    return props.date.isoWeeksInYear();
  }
});

const start_half_week = ref<boolean>(false);
// 输出当前为多少周的函数，需要调整的就是如果当前周是最末尾需要修正为1
const week: any = computed(() => {
  if (props.date.startOf("week").isoWeeksInYear() > 1) {
    start_half_week.value = true;
    if (props.date.dayOfYear() < 7 && props.date.week() > 2) {
      return 1;
    } else {
      return props.date.week() + 1;
    }
  } else {
    return props.date.week();
  }
});
</script>

<template>
  <div class="day-view" @dblclick="reset_today">
    <div class="title">
      <div class="year">
        {{ props.date.format("YYYY") }} ·
        {{ props.date.isLeapYear() ? "闰年" : "平年" }}
      </div>
      <div class="month">
        {{ props.date.format("M") }}
      </div>
      <div class="day">
        {{ props.date.format("D") }}
      </div>

      <span :class="is_today()">今</span>
    </div>

    <div class="week info1">星期{{ chinese_day }}</div>
    <div class="info1">
      当年第
      <span>{{ week }}</span> /
      <span>{{ weeks_in_year }}</span>
      周
      {{ start_half_week ? "(含首周)" : "" }}
    </div>
    <div class="info1">
      当年第
      <span>
        {{ props.date.dayOfYear() }}
      </span>

      天
    </div>
    <div class="info1">
      于当月
      <span>
        {{ get_percent(props.date.date() / props.date.daysInMonth()) }}
      </span>
    </div>

    <div class="info1">
      于当年
      <span>
        {{ get_percent(props.date.dayOfYear() / props.date.endOf("year").dayOfYear()) }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.day-view {
  display: block;
  background-color: rgb(240, 240, 240);
  width: 20rem;
  height: 21rem;
  border-radius: 0.8rem;
  overflow: hidden;
  padding-left: 1rem;
  .title {
    font-size: 2.5rem;

    display: block;
    text-align: left;
    margin-top: 1rem;
    .month,
    .day {
      font-weight: 700;
      display: inline-block;
      width: 4rem;
      background-color: rgb(253, 253, 253);
      // border: 3px #cdd1ff solid;
      text-align: center;
      border-radius: 0.5rem;
      color: #303030;
      margin-left: 0.5rem;
    }
    .year {
      margin-left: 0.5rem;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    .is_today {
      float: right;
      font-size: 1rem;
      margin-right: 2rem;
      padding: 0.2rem;
      width: 2rem;
      text-align: center;
      border-radius: 0.2rem;
      color: rgb(47, 0, 255);
      // border: 1px grey solid;
      font-weight: 700;
      background-color: #cdd1ff;
    }
    .hide {
      display: none;
    }
  }
  .week {
    margin-top: 1rem;
  }
  .info1 {
    font-size: 1.1rem;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: left;
    span {
      font-weight: 700;
      color: darkslateblue;
    }
  }
}
</style>
