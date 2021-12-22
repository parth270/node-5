module.exports=notFoundPage=(req, res, next) => {
    res.status(404).render('404',{title:'Page Not Found',layout:'layouts/main-layout'});
}