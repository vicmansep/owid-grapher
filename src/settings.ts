import * as path from 'path'
import * as parseUrl from 'url-parse'

require('dotenv').config()

interface Settings {
    // These settings are loaded from .env
    DB_NAME: string
    DB_USER: string
    DB_PASS: string
    DB_HOST: string
    DB_PORT: number
    ENV: 'production'|'development'
    WEBPACK_DEV_URL: string
    BUILD_GRAPHER_URL: string
    BUILD_ASSETS_URL: string
    BASE_DIR: string
    SECRET_KEY: string
    NODE_SERVER_HOST: string
    NODE_SERVER_PORT: number
    NODE_BASE_URL: string
    SLACK_ERRORS_WEBHOOK_URL?: string
    SESSION_COOKIE_AGE: number

    WORDPRESS_DB_NAME: string
    WORDPRESS_DIR: string
    WORDPRESS_URL: string

    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_HOST_USER: string
    EMAIL_HOST_PASSWORD: string
    EMAIL_USE_TLS: boolean

    // Where we store data exports in the form of git repos
    GIT_DEFAULT_USERNAME: string
    GIT_DEFAULT_EMAIL: string
    GITHUB_USERNAME: string
    TMP_DIR: string

    // These settings are inferred from other settings
    BUILD_GRAPHER_PATH: string
    BUILD_DIR: string
    GIT_DATASETS_DIR: string

    // The special tag that represents all untagged stuff
    UNCATEGORIZED_TAG_ID: number

    HTTPS_ONLY: boolean
    BAKED_URL: string
    BAKED_DIR: string

    BLOG_POSTS_PER_PAGE: number
    DEV_SERVER_HOST: string
    DEV_SERVER_PORT: number
}

const {env} = process

const BASE_DIR = env.BASE_DIR || path.join(__dirname, "../../")

function expect(key: string): string {
    const val = env[key]
    if (val === undefined) {
        throw new Error(`OWID requires an environment variable for ${key}`)
    } else {
        return val
    }
}

const ENV = (env.ENV === "production" || env.NODE_ENV === "production") ? "production" : "development"

const settings: Settings = {
    ENV: ENV,
    BASE_DIR: BASE_DIR,

    SECRET_KEY: ENV === "production" ? expect('SECRET_KEY') : "",

    DB_NAME: expect('DB_NAME'),
    DB_USER: env.DB_USER || "root",
    DB_PASS: env.DB_PASS || "",
    DB_HOST: env.DB_HOST || "localhost",
    DB_PORT: env.DB_PORT ? parseInt(env.DB_PORT) : 3306, 

    WORDPRESS_DB_NAME: env.WORDPRESS_DB_NAME || "",
    WORDPRESS_DIR: env.WORDPRESS_DIR || "",
    WORDPRESS_URL: env.WORDPRESS_URL || "https://owid.cloud",

    SLACK_ERRORS_WEBHOOK_URL: env.SLACK_ERRORS_WEBHOOK_URL || undefined,

    EMAIL_HOST: env.EMAIL_HOST || 'smtp.mail.com',
    EMAIL_PORT: env.EMAIL_PORT ? parseInt(env.EMAIL_PORT) : 443,
    EMAIL_HOST_USER: env.EMAIL_HOST_USER || 'user',
    EMAIL_HOST_PASSWORD: env.EMAIL_HOST_PASSWORD || 'password',
    EMAIL_USE_TLS: env.EMAIL_USE_TLS === "false" ? false : true,

    WEBPACK_DEV_URL: env.WEBPACK_DEV_URL || "http://localhost:8090",
    BUILD_GRAPHER_URL: env.BUILD_GRAPHER_URL || "http://localhost:3030/grapher",
    BUILD_ASSETS_URL: env.BUILD_ASSETS_URL || "http://localhost:8090",
    BAKED_URL: env.BAKED_URL || "http://localhost:3030",
    BAKED_DIR: env.BAKED_DIR || "/Users/mispy/wp-static",
 
    BUILD_DIR: env.BUILD_DIR || path.join(BASE_DIR, "public"),
    GIT_DATASETS_DIR: env.GIT_DATASETS_DIR || path.join(BASE_DIR, "datasetsExport"),
    SESSION_COOKIE_AGE: process.env.SESSION_COOKIE_AGE ? parseInt(process.env.SESSION_COOKIE_AGE) : 1209600,
    NODE_SERVER_HOST: process.env.NODE_SERVER_HOST || "localhost",
    NODE_SERVER_PORT: process.env.NODE_SERVER_PORT ? parseInt(process.env.NODE_SERVER_PORT) : 3030,
    NODE_BASE_URL: env.NODE_BASE_URL || `http://${env.NODE_SERVER_HOST}:${env.NODE_SERVER_PORT}`,

    GITHUB_USERNAME: env.GITHUB_USERNAME || "owid-test",
    GIT_DEFAULT_USERNAME: env.GIT_DEFAULT_USERNAME || "Our World in Data",
    GIT_DEFAULT_EMAIL: env.GIT_DEFAULT_EMAIL || "info@ourworldindata.org",
    TMP_DIR: "/tmp",

    BUILD_GRAPHER_PATH: env.BUILD_GRAPHER_URL ? parseUrl(env.BUILD_GRAPHER_URL).pathname : "http://localhost:3030/grapher",

    UNCATEGORIZED_TAG_ID: env.UNCATEGORIZED_TAG_ID ? parseInt(env.UNCATEGORIZED_TAG_ID as any) : 375,
    HTTPS_ONLY: true,

    BLOG_POSTS_PER_PAGE: 21,
    DEV_SERVER_HOST: env.DEV_SERVER_HOST || "localhost",
    DEV_SERVER_PORT: env.DEV_SERVER_PORT ? parseInt(env.DEV_SERVER_PORT) : 3099
}

export = settings