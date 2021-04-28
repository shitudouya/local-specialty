const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    size: state => state.app.size,
    device: state => state.app.device,
    roles: state => state.user.roles,
    current_info:state=>state.user.current_info,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    errorLogs: state => state.errorLog.logs
}
export default getters