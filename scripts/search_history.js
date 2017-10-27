export class IsHistory {
    constructor(el, number){
        this.$el = el;
        this.number = number;
        this.storage = window.localStorage;
        this.searchVal = this.$el.querySelector('.search-value');
        this.historyItem = this.$el.querySelector('.history-item');
        this.$el.addEventListener('click', this.handleEvent.bind(this));
        this.getSearchHistory();
    }

    handleEvent(event){
        let target = event.target;
        switch(true){
            case target.matches('.remove'):
                 this.clearAllHistory();
                 this.hideHistory();
                 break;
            case target.matches('.single-remove'):
                 this.clearSingleHistory();
                 break;
        }
    }

    hideHistory(){
        this.$el.style.display = 'none';
    }

    delete(){
        if(this.historyItem.children.length > 0){
             this.clearSingleHistory();
             this.clearAllHistory();
        }
    }

    getSearchHistory(){
        if(this.storage.getItem('search_history')){
            let searchHistory = this.storage.getItem('search_history').split(',');
            let historyItemTemp = '';
            searchHistory.forEach((val, i) => {
                historyItemTemp += `
                    <li class="history-list">
                            <a class="list-link" href="#">
                                <span class="icon"></span>
                                <span class="history-name ellipsis">${val}</span>
                                <span class="single-remove" data-text="${val}"></span>
                            </a>
                    </li>
                `;
            })
            this.historyItem.insertAdjacentHTML('afterbegin',historyItemTemp)
        }
    }

    /*写入浏览记录*/
    recordHistory(keyword){
            event.preventDefault();
            event.stopPropagation();
            let inputVal = keyword;

            /*用localStorage本地存储*/
            if(!this.storage.getItem('search_history')){//搜索历史记录不存在
                this.storage.setItem('search_history', inputVal);
            }else{//搜索历史记录存在
                let searchHistory = this.storage.getItem('search_history').split(',');

                searchHistory.forEach((val, i) => {
                    if(val == inputVal){
                        let arrayTempup = searchHistory.slice(0, i),
                            arrayTempdown = searchHistory.slice(i+1),
                            arrayTemp = arrayTempup.concat(arrayTempdown);
                        searchHistory = arrayTemp;
                    }
                })

                searchHistory.unshift(inputVal);

                if(searchHistory.length >= this.number){
                    searchHistory = searchHistory.slice(0, this.number);
                }
                this.storage.setItem('search_history', searchHistory);
            }
            this.historyItem.innerHTML = '';
            this.getSearchHistory();
    }

    /*清除所有的厉害记录*/
    clearAllHistory(){
            event.preventDefault();
            event.stopPropagation();
            this.storage.clear();
            this.historyItem.innerHTML = '';
    }

    //单个清除历史记录
    clearSingleHistory(){
            event.preventDefault();
            event.stopPropagation();
            let self = this.$el.querySelector('.single-remove');
            let selfText = self.dataset.text,
                searchHistory = this.storage.getItem('search_history').split(',');

            searchHistory.forEach((val, i) => {
                if(val == selfText){
                    let arrayTempup = searchHistory.slice(0, i),
                        arrayTempdown = searchHistory.slice(i+1),
                        arrayTemp = arrayTempup.concat(arrayTempdown);
                    this.storage.setItem('search_history', arrayTemp);
                    return false;
                }
            });
            this.historyItem.removeChild(self.parentNode.parentNode);
            if(this.historyItem.children.length == 0){
                this.hideHistory();
            }
    }
}
