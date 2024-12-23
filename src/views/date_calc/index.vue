<script setup lang="ts">
import {
  local_ref_today,
  reset_local_ref_today,
  local_const_today,
  days_gap,
} from "./utils/gzt-local-time";
import {computed, reactive, ref} from "vue";
import DayView from "./components/day_view.vue";
import {Dayjs} from "dayjs";
import {onKeyUp} from "@vueuse/core";
import router from "@/router";

const add_day = ref(1);
const add_week = ref(1);
const reverse_target = ref(local_const_today);
const reverse_calc = computed(() => {
  return days_gap(local_ref_today.value, reverse_target.value);
});

const chinese_day = (target_date: Dayjs) => {
  return ["日","一", "二", "三", "四", "五", "六"][target_date.day()];
};

onKeyUp("t", (e) => {
  e.preventDefault();
  reset_local_ref_today()

});
</script>

<template>
  <h1 @click="router.replace('/')">日期计算器</h1>
  <div class="head">
    <a-calendar
        v-model:value="local_ref_today"
        :fullscreen="false"
        class="today-choice"
    />

    <DayView :date="local_ref_today" @reset_today="reset_local_ref_today"/>
  </div>

  <div class="date-calc">
    <div class="add-day">
      <span class="show-date">
        {{ local_ref_today.format("YYYY年M月D日") }}
      </span>
      周{{ chinese_day(local_ref_today) }} 起算
      <a-input-number v-model:value="add_day" class="input-num"/>
      天后是

      <span class="show-date">
        {{ local_ref_today.add(add_day, "day").format("YYYY年M月D日") }}
      </span>

      周{{ chinese_day(local_ref_today.add(add_day, "day")) }}
    </div>
    <div class="add-week">
      <span class="show-date"> {{ local_ref_today.format("YYYY年M月D日") }}</span> 周{{ chinese_day(local_ref_today) }}
      起算
      <a-input-number v-model:value="add_week" class="input-num"/>
      周后是
      <span class="show-date">
        {{ local_ref_today.add(add_week, "week").format("YYYY年M月D日") }}
      </span>

      周{{ chinese_day(local_ref_today.add(add_day, "week")) }}
    </div>
    <div class="reverse-calc">
      <span class="show-date"> {{ local_ref_today.format("YYYY年M月D日") }}</span> 周{{
        chinese_day(local_ref_today)
      }}
      和
      <a-date-picker v-model:value="reverse_target"/>
      之间相差
      <span class="reverse-day">
        {{ reverse_calc }}
      </span>

      天
    </div>
  </div>
  <div style="margin-top: 1rem">
    <a-popover title="用法说明">
      <template #content>
        <div>
          双击右侧方形框内或按下 <span
            style="background-color: #ffc568;padding: 0.1rem 0.3rem;border-radius: 0.2rem;font-weight: 700">T</span>
          键以重置日期。
        </div>
        <div>
          联系作者：guo2018 # 88.com （请将#替换为@）
        </div>
        <div>
          作者主页：<a href="https://github.com/guohub8080/">GitHub @guohub8080</a>
        </div>

      </template>
      <a-button type="link">用法说明</a-button>
    </a-popover>
  </div>


</template>

<style scoped lang="less">
h1 {
  background-color: #2d4791;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.82);

  &:hover {
    cursor: pointer;
  }
}

.head {
  width: 40rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .today-choice {
    display: inline-block;
    width: 20rem;
    height: 21rem;
    border: 2px #f5f5f5 solid;
    border-radius: 0.5rem;
    overflow: hidden;
  }
}

.date-calc {
  margin-top: 0.5rem;

  .show-date {
    display: inline-block;
    background-color: rgb(240, 240, 240);
    width: 8rem;
    text-align: center;
    border-radius: 4px;
  }

  .add-day,
  .add-week,
  .reverse-calc {
    margin-top: 0.5rem;

    .input-num {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      width: 4rem;
    }
  }

  .reverse-day {
    font-size: 1rem;
    background: rgb(240, 240, 240);
    // padding-left: 0.5rem;
    // padding-right: 0.5rem;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 0.2rem;
  }
}
</style>
