export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index'})
}

export const registerPage = (req, res, next) => {
    res.render('layout', {content: 'register'})
}

export const loginPage = (req, res, next) => {
    res.render('layout', {content: 'login'})
}

export const championPage = (req, res, next) => {
    res.render('layout', {content: 'champions'})
}