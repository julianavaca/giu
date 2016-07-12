System.register('app/scripts/config/dashboard.api.cfg', [], function (_export) {
  'use strict';

  var dashboardApiCfg;
  return {
    setters: [],
    execute: function () {
      dashboardApiCfg = function dashboardApiCfg() {

        var apiConfig = ['apiProvider', function (apiProvider) {

          apiProvider.setBaseRoute('/media/api/v1');

          apiProvider.endpoint('mediaMaterials').route('/mediamaterials/:id');

          apiProvider.endpoint('mediaMaterialsList').route('/mediamaterials');

          apiProvider.endpoint('copyMediaMaterials').route('/mediamaterials/:idtarget/copy');

          apiProvider.endpoint('copyMediaMaterialsCurrent').route('/mediamaterials/:idtarget/copy/current');

          apiProvider.endpoint('materialmedias').route('/materialmedias/:id');

          apiProvider.endpoint('materials').route('/materials/:materialId');

          apiProvider.endpoint('chapters').route('/materials/:materialId/chapters');

          apiProvider.endpoint('plainmaterials').route('/plainmaterials/:id');

          apiProvider.endpoint('mediaMaterialsAudios').route('/mediamaterials/:id/audios/current');

          apiProvider.endpoint('mediaMaterialsSubtitles').route('/mediamaterials/:id/subtitles/current');

          apiProvider.endpoint('mediaMaterialsGraphics').route('/mediamaterials/:id/graphs/current');

          apiProvider.endpoint('medias').route('/medias/:currentId');

          apiProvider.endpoint('mediaMediaMaterials').route('/medias/:id/mediamaterials');

          apiProvider.endpoint('dailyProgramming').route('/materials/:materialId/chapters/:chapterId/programming');

          apiProvider.endpoint('mediasList').route('/medias');

          apiProvider.endpoint('mediaSegments').route('/mediamaterials/:id/segments/current');

          apiProvider.endpoint('mediaHotStart').route('/mediamaterials/:id/segments/:segmentId/hotstarts/current');

          apiProvider.endpoint('mediaHotStartEdit').route('/mediamaterials/:id/segments/:segmentId/hotstarts/:hotStartId');

          apiProvider.endpoint('mediaSqueezeCredits').route('/mediamaterials/:id/segments/:squeezeId/squeezecredits/current');

          apiProvider.endpoint('mediaSqueezeCreditsTypes').route('/squeezecreditstypes');

          apiProvider.endpoint('mediaRatings').route('/mediamaterials/:id/ratings/current');

          apiProvider.endpoint('mediaRejections').route('/mediamaterials/:id/rejections/current');

          apiProvider.endpoint('rejectionTypes').route('/rejectiontypes');

          apiProvider.endpoint('materialTypesResource').route('/materialtypes');

          apiProvider.endpoint('mediaFormatResource').route('/mediaformats');

          apiProvider.endpoint('mediaTypeResource').route('/mediatypes');

          apiProvider.endpoint('networkResource').route('/networks');

          apiProvider.endpoint('standard').route('/standards');

          apiProvider.endpoint('users').route('/users');

          apiProvider.endpoint('aspectsRatio').route('/mediamaterials/:id/aspectsratio');

          apiProvider.endpoint('aspectsRatioMedias').route('/medias/:id/aspectsratio');

          apiProvider.endpoint('editors').route('/editors');

          apiProvider.endpoint('photoTypes').route('/phototypes');

          apiProvider.endpoint('videoStandards').route('/videostandards');

          apiProvider.endpoint('technicalsState').route('/technicalsstate');

          apiProvider.endpoint('audioContents').route('/audiocontents');

          apiProvider.endpoint('audioTypes').route('/audiotypes');

          apiProvider.endpoint('languages').route('/languages');

          apiProvider.endpoint('graphicContents').route('/subtitlecontents');

          apiProvider.endpoint('graphicTypes').route('/graphictypes');

          apiProvider.endpoint('subtitleContents').route('/subtitlecontents');

          apiProvider.endpoint('subtitleTypes').route('/subtitletypes');

          apiProvider.endpoint('countries').route('/countries');

          apiProvider.endpoint('ratingDetails').route('/countries/:ratingDetails/ratingdetails');

          apiProvider.endpoint('setOfTapesCurrent').route('/mediamaterials/:id/settape/current');

          apiProvider.endpoint('relMedias').route('/mediamaterials/:id/mediasassociated/current');

          apiProvider.endpoint('creditsTypes').route('/creditstypes');

          apiProvider.endpoint('technicalQualities').route('/rejectiontypes/:typeId/technicalqualities');

          apiProvider.endpoint('technicalStateAudit').route('/mediamaterials/:id/technicalstateaudit');

          apiProvider.endpoint('status').route('/status');

          apiProvider.endpoint('transmission').route('/transmission');

          apiProvider.endpoint('materialTitles').route('/materials/:materialId/titles');

          apiProvider.endpoint('chapterTitles').route('/materials/:materialId/chapters/:chapterId/titles');

          apiProvider.endpoint('cloneMedia').route('/medias/:mediaId/clone');

          apiProvider.endpoint('cloneMediaLfid').route('/medias/:mediaId/lfids');

          apiProvider.endpoint('editedby').route('/editedby');

          apiProvider.endpoint('feeds').route('/feeds');

          apiProvider.endpoint('materialFeeds').route('/materials/:materialId/feeds');

          apiProvider.endpoint('materialNetworks').route('/materials/:materialId/networks');

          apiProvider.endpoint('lfidsegments').route('/mediamaterials/:id/lfids/:id/segments');

          apiProvider.endpoint('mediamateriallfid').route('/mediamaterials/:id/lfids');

          apiProvider.endpoint('materialRatings').route('/materials/:materialId/ratings/current');

          apiProvider.endpoint('materialChapterRatings').route('/materials/:materialId/chapters/:chapterId/ratings/current');

          apiProvider.endpoint('mediamaterialstatus').route('/mediamaterialstatus/:id');
        }];

        return apiConfig;
      };

      _export('default', dashboardApiCfg);
    }
  };
});
//# sourceMappingURL=dashboard.api.cfg.js.map
