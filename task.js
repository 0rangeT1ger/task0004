/**
 * Created by wujia_000 on 2015/5/25.
 */
$(document).ready(function(){
        var utilDate=new Date();
        var toStandardTimeString =function(){
            return this.toLocaleString().match(/\d+/g).splice(0,3).join("-");
        }
        Date.prototype.toStandardTimeString=toStandardTimeString;
        utilDate = utilDate.toStandardTimeString();
        var Todo = (function () {
            var Todo = function (title, continent, date, task, type) {
                this.date=date||utilDate;
                this.title=title||"Input title.";
                this.isFinish=false;
                this.continent=continent||"Input continent.";
                this.task=task||"unknown task.";
                this.type_=type||"unknown type.";
            };
            return function (title, continent, date, task, type) {
                return new Todo(title, continent, date, task, type);
            };
        })();
        var newTodo_1= new Todo("给李诗雨买钻戒！","具体的话，要五百克拉恐龙蛋！",utilDate,"娶了李诗雨！","李诗雨老公必做的一百件事！");
        var newTodo_2= new Todo("给李诗雨买婚纱！","买最贵的！",utilDate,"娶了李诗雨！","李诗雨老公必做的一百件事！");
        var newTodo_3= new Todo("接李诗雨下班！！","用Uber搭一辆特斯拉接送！",utilDate,"服务李诗雨老婆爸爸！","李诗雨老公必做的一百件事！");
        var newTodo_4= new Todo("写代码！赚钱！吃饭！","努力工作！玩命学习！挣大钱！",utilDate,"做个好老公好男人！","人生理想！");
        var todoList=[newTodo_1,newTodo_2,newTodo_3,newTodo_4];
        /**
         * 初始数据设定完毕，数据格式基本定了下来，接下来编写数据方法
         * 通过遍历查询和筛选，从数组中寻找信息
         */
        var uniquePush = function(pushObject){
            for(var i = 0; i<this.length; i++){
                if(pushObject===this[i]){
                   return false;
                }
            }
            this.push(pushObject);
            return true;
        };
        Array.prototype.uniquePush = uniquePush;
        function findTypeList(todoList){
            var targetTypeList=[];
            for(var i=0;i<todoList.length;i++){
                if(todoList[i]){
                    targetTypeList.uniquePush(todoList[i].type_);
                    targetTypeList.uniquePush(todoList[i].task+"/task");  //通过后缀来显示type与task的层级关系。
                }
            }
            return targetTypeList;
        }
        var typeList=findTypeList(todoList);
        function refreshTypeCol(){
            for(var i = 0; i<typeList.length; i++){
                var tempNode = $(document.createElement("div"));
                if(typeList[i].indexOf("task")===-1){
                    tempNode.addClass("typeList");
                    tempNode.text(typeList[i]);
                    $(".typeListCol").append(tempNode);
                }
                else{
                    tempNode.addClass("taskList");
                    tempNode.text(typeList[i].split("/")[0]);
                    $(".typeListCol").append(tempNode);
                }
            }
        }
        console.log(typeList);
        refreshTypeCol();
    }
);