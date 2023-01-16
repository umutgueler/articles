import { UI } from "../ui/UI";

import { LoginPageEventsListener } from "./LoginPageEvents";

import { HomePageUI } from "../ui/HomePageUI";
import { LoginPageUI } from "../ui/LoginPageUI";

import { ArticleRequest } from "../request/ArticleRequest"

import { AuthRequest } from "../request/AuthRequest";
import { Storage } from "../storage/Storage";
import { ProfilePageUI } from "../ui/PofilePageUI";
import { ProfilePageEventsListener } from "./ProfilePageEvents";
import * as bootstrap from 'bootstrap'
import { GetElementAsync } from "../helpers/getElement/GetElementAsync";
import { RegisterPageUI } from "../ui/RegisterPageUI";
import { RegisterPageEvents } from "./RegisterPageEvents";
import { ContactPageUI } from "../ui/ContactPageUI";
import { ContactPageEvents } from "./ContactPageEvents";
import { AddArticlePageUI } from "../ui/AddArticlePageUI";
import { AddArticlePageEvents } from "./AddArticlePageEvents";
import { ErrorHandling } from "../helpers/error/ErrorHandling";
import { ArticlePageUI } from "../ui/ArticlePageUI";
import Navigo from "navigo";
import { ArticlePageEvents } from "./ArticlePageEvents";

const router = new Navigo("/", { strategy: 'ALL' });

export default router

export class EventListener {
    constructor() {

        //UI
        this.ui = new UI();
        this.router = router
        //Request
        this.articleRequest = new ArticleRequest();
        this.authRequest = new AuthRequest();


        this.getElementAsync = new GetElementAsync();
        this.storage = new Storage();

        this.errorHandling = new ErrorHandling();

        this.main = document.querySelector("main");
        this.body = document.querySelector("body");
        this.pageMain = document.querySelector("#pageMain");






    }



    eventListener() {
        this.router
            .on(() => {
                this.router.navigate("/home");

            })
            .resolve();


        this.router.hooks(
            {
                after: (match) => {

                    const navbarLinks = document.querySelectorAll(".nav-link");

                    this.ui.navbarActiveLinkChange(match.url.split("/")[0], navbarLinks);

                    const offCanvasButtonDiv = document.getElementById("offCanvasButtonDiv")
                    this.ui.offCanvasButtonDisplay(match.url.split("/")[0], offCanvasButtonDiv)
                }
            })









        document.addEventListener("DOMContentLoaded", () => {
            this.constructorUI();

        });

        this.getElementAsync.getElementByIDAsync("navbarSupportedContent").then(
            res => {
                const navCollapse = new bootstrap.Collapse(res, { toggle: false });
                const nav = document.querySelectorAll("nav")[0];
                const navLinks = nav.querySelectorAll("a")

                navLinks.forEach(navLink => {
                    if (!navLink.classList.contains("dropdown-toggle")) {
                        navLink.addEventListener("click", () => {

                            navCollapse.hide()
                        })
                    }

                    if (navLink.classList.contains("dropdown-item")) {
                        navLink.addEventListener("click", (e) => {

                            const drowDown = new bootstrap.Dropdown(e.target.parentElement.parentElement);
                            drowDown.hide();
                        })
                    }
                })



            }
        )



    }


    async eventListenerAfterLoaded() {

        this.router
            .on("/home", () => {

            })
            .on("/login", () => {

                const loginPageEventsListener = new LoginPageEventsListener();
                loginPageEventsListener.loginPageEvents();



            })
            .on("/profile", () => {


                const profilePageEvents = new ProfilePageEventsListener();
                profilePageEvents.profilePageEvents();




            })
            .on("/register", () => {


                const registerPageEvents = new RegisterPageEvents();
                registerPageEvents.registerPageEvents();



            })
            .on("/contact", () => {

                const contactPageEvents = new ContactPageEvents();
                contactPageEvents.contactPageEvents();



            })
            .on("/addarticle", () => {


                const addArticlePageEvents = new AddArticlePageEvents();
                addArticlePageEvents.addArticlePageEvents();




            })
            .resolve();



    };

    async constructorUI() {





        this.main.prepend(this.ui.navbarUI(this.storage.getUserDataStorage()));

        this.renderMainDiv()


        this.main.appendChild(this.ui.footerUI());
        /*  }) */
    }

    async renderMainDiv() {

        this.router
            .on("/home", () => {
                (async () => {
                    await this.ui.renderPage(this.homePage(), this.pageMain)
                    this.router.updatePageLinks();
                })();



            })
            .on("/login", () => {

                this.ui.renderPage(this.loginPage(), this.pageMain)
            })
            .on("/profile", () => {
                const userData = this.storage.getUserDataStorage()?.userdata;
                if (!userData) {
                    this.errorHandling.authError();
                }
                else {
                    this.ui.renderPage(this.profilePage(), this.pageMain);
                }

            })
            .on("/register", () => {
                this.ui.renderPage(this.registerPage(), this.pageMain)

            })
            .on("/contact", () => {
                this.ui.renderPage(this.contactPage(), this.pageMain)
            })
            .on("/logout", () => {
                this.authRequest.logout();
                this.storage.deleteUserDataFromStorage();
                location.href = "/home"
            })
            .on("/addarticle", () => {
                const userData = this.storage.getUserDataStorage()?.userdata;
                if (!userData || userData === undefined) {
                    this.errorHandling.authError();
                }

                this.ui.renderPage(this.addArticlePage(), this.pageMain);
            })
            .on("/article*", () => {
                const articlesDiv = document.getElementById("articlesDiv");
                if (!articlesDiv) {


                    (async () => {
                        await this.ui.renderPage(this.articlePage(), this.pageMain);

                    })();

                    const articlePageEvents = new ArticlePageEvents();
                    articlePageEvents.articlePageEvents();
                }


            })
            .resolve();



        this.eventListenerAfterLoaded();








    }


    //PAGE
    async homePage() {
        const mostLikedArticleParams = {
            page: "1",
            limit: "3",
            population: "user",
            sortBy: "most-liked"
        }
        const mostCommentArticleParams = {
            page: "1",
            limit: "3",
            population: "user",
            sortBy: "most-comment"
        }
        const mostLikedArticle = await this.articleRequest.getArticles(mostLikedArticleParams);
        const mostCommentArticle = await this.articleRequest.getArticles(mostCommentArticleParams);

        const homePageUI = new HomePageUI(mostLikedArticle, mostCommentArticle);

        return homePageUI.renderHomePage();
    }
    loginPage() {
        const loginPageUI = new LoginPageUI();
        return loginPageUI.renderLoginPageUI();
    }

    profilePage() {
        const userData = this.storage.getUserDataStorage()?.userdata
        if (!userData) {
            this.errorHandling.authError();
        }
        const profilePageUI = new ProfilePageUI(userData);
        return profilePageUI.renderProfilePageUI();


    }

    registerPage() {
        const registerPageUI = new RegisterPageUI();
        return registerPageUI.renderRegisterPage();
    }

    contactPage() {
        const userdata = this.storage.getUserDataStorage()?.userdata
        const contactPageUI = new ContactPageUI();
        return contactPageUI.renderContactPageUI(userdata);
    }
    addArticlePage() {
        const addArticlePageUI = new AddArticlePageUI();
        return addArticlePageUI.renderAddArticlePageUI();

    }
    articlePage() {
        if (!this.articlePageUI) {
            this.articlePageUI = new ArticlePageUI();
            return this.articlePageUI.renderArticlePageUI();
        }
        return this.articlePageUI.renderArticlePageUI();

    }






}



