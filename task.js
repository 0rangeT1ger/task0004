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
        function find(type,str){
            var targetList = [];
            for(var i = 0;i<todoList.length; i++){
                if(todoList[i]){
                    if(type==="title"&&todoList[i].title===str){         //如果是按照title寻找，那么搜寻出指定title的第一个todo
                        return todoList[i];
                    }
                    if(type==="task"&&todoList[i].task===str){           //如果是按照task寻找，那么搜寻出task下所有的todo
                        targetList.push(todoList[i]);
                    }
                    if(type==="type"&&todoList[i].type_===str){           //如果是按照type寻找，那么搜寻出这个type下所有的task
                        targetList.push(todoList[i].task);
                    }
                    if(type==="date"&&todoList[i].date===str){
                        targetList.push(todoList[i]);
                    }
                    if(type==="dateList"&&todoList[i].task===str){
                        targetList.uniquePush(todoList[i].date);
                    }
                    if(type==="task-date"&&todoList[i].task===str.split("-")[0]&&todoList[i].date===str.split("-")[1]){
                        targetList.push(todoList[i]);                     //如果按照date-task寻找，那么寻找task下所有的满足日期的todo对象
                    }
                    if(type==="type-task"&&todoList[i].type_===str.split("-")[0]&&todoList[i].task===str.split("-")[1]){
                        targetList.push(todoList[i]);
                    }
                }
            }
            return targetList;
        }
        var typeList=findTypeList(todoList);
        function refreshTypeCol(){                                      //刷新type栏
            for(var i = 0; i<typeList.length; i++){
                var tempNode = $(document.createElement("div"));
                if(typeList[i].indexOf("task")===-1){
                    tempNode.addClass("typeList");
                    tempNode.text(typeList[i]);
                }
                else{
                    tempNode.addClass("taskList");
                    tempNode.text(typeList[i].split("/")[0]);
                }
                $(".typeListCol").append(tempNode);
            }
        }
        console.log(typeList);
        refreshTypeCol();
        function refreshTimeCol(){
            var activeTask;
            var dateList = find("dateList",activeTask);
        }
    }
);