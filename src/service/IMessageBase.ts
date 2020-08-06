export interface IMessageBase {
    init(data:any, msgCategory:any, socketProxy:any);  // 初始化
    execute(); // 执行函数
}