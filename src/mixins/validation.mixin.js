import {ERROR} from "@/constants/error-constants";

export default {
    methods: {
        isLimitedValue(value, limit) {
            if (value && limit)
               return value > limit ? ERROR.limit(limit) : '';
            return '';
        }
    }
}