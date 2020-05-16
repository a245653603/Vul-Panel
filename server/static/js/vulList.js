new Vue({
    el: '#app',
    delimiters: ["{[", "]}"], // 可自定义符号
    data() {
        return {
            test: "",
            recentList: "",
            vulData: this.vulData,
            totalItems: 0,
            totalPages: 0,
            perPage : 20,
            pageNow : 1,
            pageList : []
        }
    },
    created() {
        if (localStorage.getItem("pageNow") == null) {
            this.pageNow = 0
        } else {
           this.pageNow = localStorage.getItem("pageNow")
        }
        this.loadList(this.pageNow)
    },
    methods:{
        async getListByPage(p) {
            return await axios.get('/api/getPages?p='+p)
        },
        async getTotalPages() {
            return await axios.get('/api/getPages?t=totalPages')
        },

        async loadList(page) {
            this.recentList = ""
            this.vulData = (await this.getListByPage(page)).data;
            this.totalPages = (await this.getTotalPages()).data;
            // if (this.totalPages > 10 ) {
            //     this.pageList.push
            // }
            var color = ""
            console.log(this.vulData);
            for (var i in this.vulData) {
                if (this.vulData[i].Read) {
                    color = "#0090ff"
                } else {
                    color = "rgba(255,0,104,0.63)"
                }

                if (this.vulData[i].VulUrl.length > 70) {
                    var VulUrl = this.vulData[i].VulUrl.substring(0,70) + "...."
                } else {
                    VulUrl = this.vulData[i].VulUrl
                }
                this.recentList +=
                    "                <div class=\"media text-muted pt-3\">" +
                    "                    <p class=\"media-body pb-3 mb-0 small lh-125 border-bottom border-gray\">" +
                    "                        <strong class=\"d-block text-gray-dark\">" + this.vulData[i].CreatedAt + "</strong>" +
                    "<a style='color: " + color + ";font-weight:bold; text-decoration: none' href="+ this.vulData[i].Url + ">" + this.vulData[i].Host +"</a>" + "<a style='padding-left: 50px'>"+VulUrl + "</a>" + "<p style='color: red;font-size: 12px;'>" +this.vulData[i].Title + "</p>" +
                    "                </div>"
            }
        },

        switchToPage: function (pageNo) {
            if (pageNo < 0 || pageNo > this.totalPages+1){
                return false;
            }
            this.pageNow = pageNo
            this.loadList(pageNo)
            localStorage.setItem("pageNow",pageNo)
        },
    }

});

// function getListByPage(pageNow) {
//     $.ajax({
//         url:"/user/"+pageNow,
//         success:function (datas) {
//             vueApp.userList = datas.content;
//             vueApp.totalPages = datas.totalPages;
//             vueApp.pageNow = pageNow;
//         },
//         error:function (res) {
//             console.log(res);
//         }
//     });
// }