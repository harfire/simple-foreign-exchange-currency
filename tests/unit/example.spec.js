import { shallowMount } from '@vue/test-utils';
import ForeignExchangeCurrency from '@/components/ForeignExchangeCurrency.vue';

describe('ForeignExchangeCurrency.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(ForeignExchangeCurrency, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
