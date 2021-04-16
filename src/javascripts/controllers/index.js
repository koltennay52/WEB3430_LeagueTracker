export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'Home Page'})
}