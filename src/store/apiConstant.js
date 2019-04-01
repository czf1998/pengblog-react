const server = 'https://pengblog.xyz/pengblog-SSM/'
//const server = 'http://pengblog.xyz:8080/pengblog-SSM/'
//const server = 'http://localhost/pengkaifanblog/'
//const server = 'http://localhost:8088/pengkaifanblog/'


export const API_GET_ARTICLE_LIST_BY_LIMITINDEX = server + 'article/article_summary.do'

export const API_GET_ARTICLE_BY_ID = server + 'article/article.do';

export const API_GET_COMMENT_LIST_BY_LIMITINDEX = server + 'comment/comment_list.do'

export const API_GET_COUNT_OF_COMMENT = server + 'comment/comment_count.do'

export const API_GET_TOP_LEVEL_COMMENT_LIST_BY_LIMITINDEX = server + 'comment/top_level_comment_list.do'

export const API_GET_SUB_COMMENT_LIST = server + 'comment/sub_comment_list.do';

export const API_POST_SUBMIT_COMMENT = server + 'comment/submit_comment.do';

export const API_GET_DRAFT = server + 'article/draft.do '

export const API_UPLOAD_IMAGE = server + 'image/image_upload.do'

export const API_SAVE_ARTICLE = server + 'article/upload_article.do'

export const API_POST_IMAGE = server + 'image/image_upload.do'

export const API_GET_ARTICLE_FILING = server + 'article/article_filing.do'

export const API_GET_ARTICLE_LABEL = server + 'article/article_label.do'

export const API_GET_ARTICLE_LIST_BY_SEARCH = server + 'article/article_bysearch.do'

export const API_GET_ARTICLE_LIST_BY_FILING = server + 'article/article_byfiling.do'

export const API_GET_ARTICLE_LIST_BY_LABEL = server + 'article/article_bylabel.do'

export const API_DELETE_ARTICLE = server + 'article/delete_article.do'

export const API_DELETE_ARTICLE_LIST = server + 'article/delete_article_list.do'

export const API_LOGIN = server + 'login/login.do'

export const API_GET_FRESH_COMMENT_LIST = server + 'comment/comment_last.do'

export const API_DELETE_COMMENT = server + 'comment/comment_delete.do'

export const API_GET_CAPTCHA = server + 'captcha/get_captcha.do'

export const API_CHECK_CAPTCHA = server + 'captcha/check_captcha.do'

export const API_GET_SMS = server + 'sms/send.do'

export const API_LOGIN_WITH_DYNAMIC_PASSWORD = server + 'login/login_dynamic.do'

export const API_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT = server + 'comment/check_whether_need_captcha.do'

export const API_BAN_IP = server + 'ip/ban_byip.do'

export const API_LIFTED_IP = server + 'ip/lifted_byip.do'

export const API_IP_LIST = server + 'ip/ip_list_been_banned.do'