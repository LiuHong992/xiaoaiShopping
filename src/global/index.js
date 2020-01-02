import Vue from 'vue'
import Top from '../components/Top/Top'
import Betterscroll from '../components/Betterscroll/BetterScroll'
import BetterscrollX from '../components/Betterscroll/BetterscrollX'

Vue.component('mytop', Top)
Vue.component('better', Betterscroll)
Vue.component('betterx', BetterscrollX)


Vue.prototype.$goto = function(item, index = 1) {
    // console.log(item);
    if (item) {
        this.$router.push({
            name: "goodsdetails",
            query: {
                id: item
            }
        });
    } else {
        this.$router.go(-1)
    }
}