<template>
  <div class="container">
    <h1 class="title is-4">Foreign Exchange Currency App Exercise</h1>
    <br />
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-4 has-text-left">
          &nbsp;
        </div>
        <div class="column is-4">
          <template v-if="loading">
            <div class="box box--custom">
              <div class="box--custom--item">
                <a class="button is-white is-loading">Loading</a>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="has-text-left box box--custom">
              <div class="box--custom--title">
                <div class="columns">
                  <div class="column is-full is-italic no-pad">
                    {{ baseRates.base }} - {{ getCurrencyDesc(baseRates.base) }}
                  </div>
                </div>
                <div class="columns">
                  <div class="column has-text-weight-bold">{{ baseRates.base }}</div>
                  <div class="column is-one-quarter has-text-weight-bold has-text-right">
                    <template v-if="!updateCurrencyValue">
                      <a @click="updateCurrencyValue = true">{{ getCurrencyValue(baseRates.base, baseRates.rates) }}</a>
                    </template>
                    <template v-else>
                      <div class="columns">
                        <div class="column">
                          <div class="field has-addons">
                            <div class="control">
                              <input
                                class="input has-text-weight-bold has-text-right"
                                v-model.number="newBaseRateValue"
                                @blur="updateCurrencyValue = false"
                                type="text"
                                placeholder="New Base Rate"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <div v-for="(item, index) in lists" :key="`${index + 1}`" class="box--custom--item">
                <div class="columns">
                  <div class="column left-col">
                    <div class="columns no-margin-bottom">
                      <div class="column is-half has-text-weight-bold no-pad-bottom">
                        <span class="is-7">{{ item }}</span>
                      </div>
                      <div class="column is-half has-text-weight-bold has-text-right no-pad-bottom">
                        <span class="is-7">{{ formatNumber(getCurrencyValue(item, baseRates.rates)) }}</span>
                      </div>
                    </div>
                    <div class="columns no-margin-bottom">
                      <div class="column is-full has-text-weight-bold is-italic no-pad-bottom is-size-7">
                        {{ item }} - {{ getCurrencyDesc(item) }}
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-full is-italic">
                        1 {{ item }} = {{ formatNumber(getBaseCurrencyValue(item, baseRates.rates)) }}
                      </div>
                    </div>
                  </div>
                  <div class="column right-col is-one-fifth has-text-weight-bold has-text-centered border-left">
                    <a @click="deleteItemList(item)">✖</a>
                  </div>
                </div>
              </div>

              <div v-if="!lists.length" class="box--custom--item no-border no-pad-left">
                <div class="columns">
                  <div class="column">
                    Please Add New Currency
                  </div>
                </div>
              </div>

              <div class="box--custom--item form">
                <!-- Error Notif -->
                <template v-if="showErrorNotif">
                  <div class="columns no-margin-bottom">
                    <div class="column">
                      <div class="notification is-danger">
                        <button @click="hideErrorNotification" class="delete"></button>
                        Currencies not available!
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Warning Notif -->
                <template v-if="showWarningNotif">
                  <div class="columns no-margin-bottom">
                    <div class="column">
                      <div class="notification is-warning">
                        <button @click="hideWarningNotification" class="delete"></button>
                        Currencies already exist!
                      </div>
                    </div>
                  </div>
                </template>

                <form @submit.prevent="submitNewCurrency(inputNew)">
                  <div class="columns no-margin-bottom">
                    <div class="column has-text-weight-bold">
                      <input class="input is-full" type="text" v-model="inputNew" placeholder="Example: IDR" />
                    </div>
                    <div class="column is-one-third has-text-weight-bold has-text-right">
                      <button type="submit" class="button is-info is-fullwidth">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </template>
        </div>
        <div class="column is-4 has-text-right">
          <div class="info-currency-cont">
            <h5>Available Currency</h5>
            <p v-for="item in currenciesDetail" :key="item.id" class="is-size-7 no-margin-bottom has-text-grey">
              <span class="has-text-weight-bold has-text-grey-dark">{{ item.id }}</span> - {{ item.descriptions }}
            </p>
          </div>
        </div>
      </div>
      <p class="footer"><strong>Haris Rahman</strong>&nbsp;<small>|</small>&nbsp;<small>+628159156249</small></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import currencyDetail from './mixins/currenciesDetailData.js';

export default {
  name: 'ForeignExchangeCurrency',
  props: {
    msg: String
  },
  mixins: [currencyDetail],
  data() {
    return {
      loading: true,
      baseRates: {},
      lists: ['IDR', 'EUR', 'GBP', 'SGD'],
      inputNew: '',
      showErrorNotif: false,
      showWarningNotif: false,
      updateCurrencyValue: false,
      baseCurrencyValue: 10
    };
  },
  computed: {
    newBaseRateValue: {
      get() {
        return this.baseCurrencyValue;
      },
      set(val) {
        this.baseCurrencyValue = val;
      }
    }
  },
  mounted() {
    axios.get('https://api.exchangeratesapi.io/latest?base=USD').then((response) => {
      this.baseRates = {
        base: response.data.base,
        date: response.data.date,
        rates: response.data.rates,
        descriptions: this.currenciesDetail
      };

      this.loading = false;
    });
  },
  methods: {
    getCurrencyDesc(code) {
      return this.currenciesDetail.find((id) => id.id === code).descriptions;
    },
    getCurrencyValue(code, val) {
      return val[code] * this.baseCurrencyValue;
    },
    getBaseCurrencyValue(code, val) {
      return val[code];
    },
    submitNewCurrency(value) {
      // Reset Warning
      this.showErrorNotif = false;
      this.showWarningNotif = false;

      const symbol = value.toUpperCase();
      const data = this.currenciesDetail.find((id) => id.id === symbol);
      const excistingData = this.lists.find((id) => id === symbol);

      // Check Data
      if (data && data.id) {
        if (excistingData) {
          this.showWarningNotif = true;

          return false;
        }
      } else {
        this.showErrorNotif = true;

        return false;
      }

      this.lists.push(symbol);
      this.inputNew = '';
    },
    deleteItemList(id) {
      this.loading = true;
      this.lists = this.lists.filter((item) => item !== id);
      this.loading = false;
    },
    formatNumber(value = 0) {
      const val = (value / 1).toFixed(2).replace('.', ',');

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    hideErrorNotification() {
      this.showErrorNotif = false;
    },
    hideWarningNotification() {
      this.showWarningNotif = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box--custom {
  padding: 0;
  float: left;
  width: 100%;
}

.box--custom .box--custom--title {
  padding: 20px;
  border-bottom: solid 1px #ddd;
}

.box--custom .box--custom--item {
  padding: 10px;
  border-radius: 2px;
  margin: 15px;
  border: solid 1px #ddd;
}

.left-col {
  width: 80% !important;
}

.right-col {
  width: 12% !important;
}

.no-pad {
  padding: 0 12px !important;
}

.no-pad-left {
  padding: 12px 0 !important;
}

.no-pad-bottom {
  padding-bottom: 0 !important;
}

.border-left {
  border-left: solid 1px #ddd;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.no-margin-bottom {
  margin-bottom: 0 !important;
}

.form {
  border-width: 0 !important;
  padding: 0 !important;
}

.form .control {
  width: 100%;
}

.footer {
  padding: 30px 0;
  background-color: #fff;
}

.no-border {
  border-width: 0 !important;
}

.info-currency-cont {
  position: fixed;
  top: 50px;
  right: 50px;
}
</style>
