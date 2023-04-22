
import dayjs from "dayjs";
import { ref } from "vue";
import { Dayjs } from "dayjs";
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import dayOfYear from "dayjs/plugin/dayOfYear"
import weekOfYear from "dayjs/plugin/weekOfYear"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(dayOfYear);
dayjs.extend(updateLocale)
dayjs.locale("zh-cn")
dayjs.updateLocale("zh-cn", {weekStart: 7})

export const local_ref_today = ref<Dayjs>(dayjs());
export const local_const_today: Dayjs = dayjs()
export const reset_local_ref_today = () => {
    local_ref_today.value = ref<Dayjs>(dayjs()).value;
}
export const days_gap = (base_date: Dayjs, target_date: Dayjs) => {
    try {
        const base_f_d = dayjs(base_date.format("YYYY-MM-DD"))
        const target_f_d = dayjs(target_date.format("YYYY-MM-DD"))
        const result = base_f_d.diff(target_f_d, "day") * -1
        if (isNaN(result)){
            return "#"
        }else{return result}
    } catch (err) {
        return "#"
    }
}