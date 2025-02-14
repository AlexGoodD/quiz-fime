import { ref, watch } from 'vue';

export function useSliderQuestion(props: { modelValue: number; min: number }, emits: (event: 'update:modelValue', value: number) => void) {
    const sliderValue = ref(props.modelValue || props.min);

    watch(
        () => props.modelValue,
        (newValue) => {
            sliderValue.value = newValue;
        }
    );

    function updateValue() {
        emits('update:modelValue', sliderValue.value);
    }

    return { sliderValue, updateValue };
}

export function useTrueFalseQuestion(props: { modelValue: string | null }) {
    const selectedValue = ref<string | null>(props.modelValue);

    watch(
        () => props.modelValue,
        (newValue) => {
            selectedValue.value = newValue;
        }
    );

    function updateValue(value: string, emits: (event: 'update:modelValue', value: string) => void) {
        selectedValue.value = value;
        emits('update:modelValue', value);
    }

    return { selectedValue, updateValue };
}

export function useMultipleChoiceQuestion(props: { modelValue: string | null }) {
    const selectedOption = ref<string | null>(props.modelValue);

    watch(
        () => props.modelValue,
        (newValue) => {
            selectedOption.value = newValue;
        }
    );

    function updateOption(option: string, emits: (event: 'update:modelValue', value: string) => void) {
        selectedOption.value = option;
        emits('update:modelValue', option);
    }

    return { selectedOption, updateOption };
}