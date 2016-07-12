package com.turner.configuration;

/**
 * Created by pcastelo on 3/3/16.
 */

public enum MediaAuthorities {


    URL_AUDIO_CONTENTS_R("/api/v1/audiocontents/", "GET", "MACR"),
    URL_AUDIO_TYPES_R("/api/v1/audiotypes/", "GET", "MATR"),
    URL_COUNTRIES_RATING_DETAILS_R("/api/v1/countries/*/ratingdetails/", "GET", "MCOR"),
    URL_COUNTRIES_R("/api/v1/countries/", "GET", "MCOR"),
    URL_CREDITS_TYPES_R("/api/v1/creditstypes/", "GET", "MCTR"),
    URL_EDITORS_R("/api/v1/editors/", "GET", "MEDR"),
    URL_GRAPHIC_TYPES_R("/api/v1/graphictypes/", "GET", "MGTR"),
    URL_LANGUAGES_R("/api/v1/languages/", "GET", "MLAR"),
    URL_MATERIALS_R("/api/v1/materialmedias/", "GET", "MMAR"),
    URL_MATERIAL_TYPES_R("/api/v1/materialtypes/", "GET", "MMTR"),
    URL_MEDIA_FORMATS_R("/api/v1/mediaformats/", "GET", "MMFR"),
    URL_MEDIA_MATERIALS_R("/api/v1/mediamaterials", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_RL("/api/v1/mediamaterials?*", "GET", "MMMR"),
    //URL_MEDIA_MATERIALS_C("/api/v1/mediamaterials", "POST", "?"),
    URL_MEDIA_MATERIALS_U("/api/v1/mediamaterials", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_ASPECT_RATIO_R("/api/v1/mediamaterials/*/aspectsratio/", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_AUDIOS_R("/api/v1/mediamaterials/*/audios", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_AUDIOS_U("/api/v1/mediamaterials/*/audios", "PUT", "MMMU"),
    URL_MEDIAMATERIALS_COPY_R("/api/v1/mediamaterials/*/copy", "GET", "MMMR"),
    URL_MEDIAMATERIALS_COPY_C("/api/v1/mediamaterials/*/copy", "POST", "MMMC"),
    URL_MEDIA_MATERIALS_GRAPHS_R("/api/v1/mediamaterials/*/graphs", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_GRAPHS_U("/api/v1/mediamaterials/*/graphs", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_ASSOCIATEDS_R("/api/v1/mediamaterials/*/mediasassociated", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_ASSOCIATEDS_U("/api/v1/mediamaterials/*/mediasassociated", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_SETTAPE_R("/api/v1/mediamaterials/*/parts/*/settape", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_SETTAPE_U("/api/v1/mediamaterials/*/parts/*/settape", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_RATINGS_R("/api/v1/mediamaterials/*/ratings", "GET", "MMRR"),
    URL_MEDIA_MATERIALS_RATINGS_U("/api/v1/mediamaterials/*/ratings", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_REJECTIONS_R("/api/v1/mediamaterials/*/rejections", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_REJECTIONS_U("/api/v1/mediamaterials/*/rejections", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_SEGMENTS_R("/api/v1/mediamaterials/*/segments", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_SEGMENTS_U("/api/v1/mediamaterials/*/segments", "PUT", "MMMU"),
    URL_MEDIA_MATERIALS_HOTSTARTS_R("/api/v1/mediamaterials/*/segments/*/hotstarts", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_SQUEEZE_CREDITS_R("/api/v1/mediamaterials/*/segments/*/squeezecredits", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_SQUEEZE_CREDITS_U("/api/v1/mediamaterials/*/segments/*/squeezecredits", "PUT", "MMMU"),
    URL_MEDIA_STATUS_R("/api/v1/status/", "GET", "MSSR"),
    URL_MEDIA_MATERIALS_SUBTITLES_R("/api/v1/mediamaterials/*/subtitles", "GET", "MMMR"),
    URL_MEDIA_MATERIALS_SUBTITLES_U("/api/v1/mediamaterials/*/subtitles", "PUT", "MMMU"),
    URL_MEDIA_SUBTITLES_TYPES_R("/api/v1/subtitletypes/", "GET", "MSTR"),
    URL_MEDIA_TECHNICALS_QUALITY_R("/api/v1/rejectiontypes/*/technicalqualities/", "GET", "MTQR"),
    URL_MEDIA_TECHNICALS_STATE_R("/api/v1/mediamaterials/*/technicalstateaudit/", "GET", "MMMR"),
    URL_MEDIA_TRANSMISSION_R("/api/v1/transmission/", "GET", "MTXR"),
    URL_MEDIA_USERS_R("/api/v1/users/", "GET", "MUSR"),
    URL_MEDIA_VIDEO_STANDARDS_R("/api/v1/videostandards/", "GET", "MVER"),
    URL_MEDIA_ASPECT_RATIO_R("/api/v1/medias/*/aspectsratio/", "GET", "MMMR"),
    URL_MEDIA_MEDIA_MATERIALS_R("/api/v1/medias/*/mediamaterials", "GET", "MMMR"),
    URL_MEDIA_MEDIA_MATERIALS_RL("/api/v1/medias/*/mediamaterials/", "GET", "MMMR"),
    URL_MATERIALS_TITLES_R("/api/v1/materials/*/titles/", "GET", "MMMR"),
    URL_MATERIALS_CHAPTERS_TITLES_R("/api/v1/materials/*/chapters/*/titles/", "GET", "MMMR"),
    URL_MEDIA_CLONE_C("/api/v1/medias/*/clone", "POST", "MMMC"),
    URL_MEDIA_VIRTUALLY_SEGMENTED_R("/api/v1/medias/*/virtuallysegmented", "POST", "MMMC"),



    VIEW_MEDIAMATERIALS("/api/v1/mediamaterials?*", "GET", "PRVM"),
    VIEW_MATERIALS("/api/v1/materials?*", "GET", "PRVM");


    public static final String ROLE_FORMAT = "ROLE_%s";
    private final String url;
    private final String method;
    private final String role;

    MediaAuthorities(String url, String method, String role) {
        this.url = url;
        this.method = method;
        this.role = role;
    }

    public String getUrl() {
        return this.url;
    }

    public String getMethod() {
        return this.method;
    }

    public String getRole() {
        return this.role;
    }

    public String getFullRole() {
        return String.format(ROLE_FORMAT, this.role);
    }
}

