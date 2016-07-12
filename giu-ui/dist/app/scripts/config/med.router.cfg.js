System.register('app/scripts/config/med.router.cfg', ['../../home/scripts/controllers/med.search.ctrl', '../../home/scripts/controllers/med.search.media.ctrl', '../../home/scripts/controllers/med.search.material.ctrl', '../../home/scripts/controllers/med.search.material.results.ctrl', '../../home/scripts/controllers/med.search.results.ctrl', '../../home/scripts/controllers/med.search.results.detail.ctrl', '../../home/scripts/controllers/med.search.results.detail.media.ctrl', '../../home/scripts/controllers/med.search.results.detail.resources.audios.ctrl', '../../home/scripts/controllers/med.search.results.detail.resources.subtitles.ctrl', '../../home/scripts/controllers/med.search.results.detail.resources.graphics.ctrl', '../../home/scripts/controllers/med.material.detail.ctrl', '../../home/scripts/controllers/med.material.detail.ratings.ctrl', '../../home/scripts/controllers/med.material.detail.chapter.ratings.ctrl', '../../home/scripts/controllers/med.new.base.ctrl.js', '../../home/scripts/controllers/med.new.media.ctrl.js', '../../home/scripts/controllers/med.new.media.material.ctrl.js', '../../home/scripts/controllers/med.new.media.plus.detail.ctrl.js', '../../home/scripts/controllers/med.new.media.segment.ctrl.js', '../../home/scripts/controllers/med.new.media.audio.ctrl.js', '../../home/scripts/controllers/med.new.media.subtitle.ctrl.js', '../../home/scripts/controllers/med.new.media.graphic.ctrl.js', '../../home/scripts/controllers/med.new.media.rejection.ctrl.js', '../../home/scripts/controllers/med.new.media.rating.ctrl.js', '../../home/scripts/controllers/med.new.media.summary.ctrl.js', '../../home/scripts/controllers/med.new.media.view.virtual.segment.ctrl.js', '../../home/scripts/controllers/med.search.results.tabs.segments.ctrl', '../../home/scripts/controllers/med.search.results.tabs.ratings.ctrl', '../../home/scripts/controllers/med.search.results.tabs.rejections.ctrl', '../../home/scripts/controllers/med.search.results.tabs.sot.ctrl', '../../home/scripts/controllers/med.search.results.tabs.medias.ctrl', '../../home/scripts/controllers/med.search.results.tabs.technical.ctrl', '../../home/scripts/controllers/med.media.edit.ctrl', '../../home/scripts/controllers/med.media.resources.edit.ctrl', '../../home/scripts/controllers/med.rejection.crud.ctrl.js', '../../home/scripts/controllers/med.material.programming.ctrl.js'], function (_export) {
  //Ctrl card subtitles
  //Ctrl card media
  'use strict';

  //Ctrl card graphics
  //Ctrl card audios
  //Ctrl card material
  var SearchCtrl, SearchMediaCtrl, SearchMaterialCtrl, SearchMaterialResultsCtrl, SearchResultsCtrl, SearchResultsDetailCtrl, SearchResultsDetailMediaCtrl, SearchResultsResourcesAudiosCtrl, SearchResultsResourcesSubtitlesCtrl, SearchResultsResourcesGraphicsCtrl, MaterialDetailCtrl, MaterialDetailRatingsCtrl, MaterialDetailChapterRatingsCtrl, NewBaseCtrl, NewMediaCtrl, NewMediaMaterialCtrl, NewMediaPlusDetailCtrl, NewMediaSegmentCtrl, NewMediaAudioCtrl, NewSubtitleCtrl, NewMediaGraphicCtrl, NewMediaRejectionCtrl, NewMediaRatingCtrl, NewMediaSummaryCtrl, ViewVirtualSegment, SearchResultsTabsSegmentsCtrl, SearchResultsTabsRatingsCtrl, SearchResultsTabsRejectionsCtrl, SearchResultsTabsSotCtrl, SearchResultsTabsMediasCtrl, SearchResultsTabsTechnicalCtrl, MediaEditCtrl, MediaResourcesEditCtrl, RejectionCrudCtrl, MaterialProgrammingCtrl, mediaroutes;
  return {
    setters: [function (_homeScriptsControllersMedSearchCtrl) {
      SearchCtrl = _homeScriptsControllersMedSearchCtrl['default'];
    }, function (_homeScriptsControllersMedSearchMediaCtrl) {
      SearchMediaCtrl = _homeScriptsControllersMedSearchMediaCtrl['default'];
    }, function (_homeScriptsControllersMedSearchMaterialCtrl) {
      SearchMaterialCtrl = _homeScriptsControllersMedSearchMaterialCtrl['default'];
    }, function (_homeScriptsControllersMedSearchMaterialResultsCtrl) {
      SearchMaterialResultsCtrl = _homeScriptsControllersMedSearchMaterialResultsCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsCtrl) {
      SearchResultsCtrl = _homeScriptsControllersMedSearchResultsCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsDetailCtrl) {
      SearchResultsDetailCtrl = _homeScriptsControllersMedSearchResultsDetailCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsDetailMediaCtrl) {
      SearchResultsDetailMediaCtrl = _homeScriptsControllersMedSearchResultsDetailMediaCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsDetailResourcesAudiosCtrl) {
      SearchResultsResourcesAudiosCtrl = _homeScriptsControllersMedSearchResultsDetailResourcesAudiosCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsDetailResourcesSubtitlesCtrl) {
      SearchResultsResourcesSubtitlesCtrl = _homeScriptsControllersMedSearchResultsDetailResourcesSubtitlesCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsDetailResourcesGraphicsCtrl) {
      SearchResultsResourcesGraphicsCtrl = _homeScriptsControllersMedSearchResultsDetailResourcesGraphicsCtrl['default'];
    }, function (_homeScriptsControllersMedMaterialDetailCtrl) {
      MaterialDetailCtrl = _homeScriptsControllersMedMaterialDetailCtrl['default'];
    }, function (_homeScriptsControllersMedMaterialDetailRatingsCtrl) {
      MaterialDetailRatingsCtrl = _homeScriptsControllersMedMaterialDetailRatingsCtrl['default'];
    }, function (_homeScriptsControllersMedMaterialDetailChapterRatingsCtrl) {
      MaterialDetailChapterRatingsCtrl = _homeScriptsControllersMedMaterialDetailChapterRatingsCtrl['default'];
    }, function (_homeScriptsControllersMedNewBaseCtrlJs) {
      NewBaseCtrl = _homeScriptsControllersMedNewBaseCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaCtrlJs) {
      NewMediaCtrl = _homeScriptsControllersMedNewMediaCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaMaterialCtrlJs) {
      NewMediaMaterialCtrl = _homeScriptsControllersMedNewMediaMaterialCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaPlusDetailCtrlJs) {
      NewMediaPlusDetailCtrl = _homeScriptsControllersMedNewMediaPlusDetailCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaSegmentCtrlJs) {
      NewMediaSegmentCtrl = _homeScriptsControllersMedNewMediaSegmentCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaAudioCtrlJs) {
      NewMediaAudioCtrl = _homeScriptsControllersMedNewMediaAudioCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaSubtitleCtrlJs) {
      NewSubtitleCtrl = _homeScriptsControllersMedNewMediaSubtitleCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaGraphicCtrlJs) {
      NewMediaGraphicCtrl = _homeScriptsControllersMedNewMediaGraphicCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaRejectionCtrlJs) {
      NewMediaRejectionCtrl = _homeScriptsControllersMedNewMediaRejectionCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaRatingCtrlJs) {
      NewMediaRatingCtrl = _homeScriptsControllersMedNewMediaRatingCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaSummaryCtrlJs) {
      NewMediaSummaryCtrl = _homeScriptsControllersMedNewMediaSummaryCtrlJs['default'];
    }, function (_homeScriptsControllersMedNewMediaViewVirtualSegmentCtrlJs) {
      ViewVirtualSegment = _homeScriptsControllersMedNewMediaViewVirtualSegmentCtrlJs['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsSegmentsCtrl) {
      SearchResultsTabsSegmentsCtrl = _homeScriptsControllersMedSearchResultsTabsSegmentsCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsRatingsCtrl) {
      SearchResultsTabsRatingsCtrl = _homeScriptsControllersMedSearchResultsTabsRatingsCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsRejectionsCtrl) {
      SearchResultsTabsRejectionsCtrl = _homeScriptsControllersMedSearchResultsTabsRejectionsCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsSotCtrl) {
      SearchResultsTabsSotCtrl = _homeScriptsControllersMedSearchResultsTabsSotCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsMediasCtrl) {
      SearchResultsTabsMediasCtrl = _homeScriptsControllersMedSearchResultsTabsMediasCtrl['default'];
    }, function (_homeScriptsControllersMedSearchResultsTabsTechnicalCtrl) {
      SearchResultsTabsTechnicalCtrl = _homeScriptsControllersMedSearchResultsTabsTechnicalCtrl['default'];
    }, function (_homeScriptsControllersMedMediaEditCtrl) {
      MediaEditCtrl = _homeScriptsControllersMedMediaEditCtrl['default'];
    }, function (_homeScriptsControllersMedMediaResourcesEditCtrl) {
      MediaResourcesEditCtrl = _homeScriptsControllersMedMediaResourcesEditCtrl['default'];
    }, function (_homeScriptsControllersMedRejectionCrudCtrlJs) {
      RejectionCrudCtrl = _homeScriptsControllersMedRejectionCrudCtrlJs['default'];
    }, function (_homeScriptsControllersMedMaterialProgrammingCtrlJs) {
      MaterialProgrammingCtrl = _homeScriptsControllersMedMaterialProgrammingCtrlJs['default'];
    }],
    execute: function () {
      mediaroutes = function mediaroutes() {

        var routerConfig = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

          $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').go('search');
          });

          $stateProvider.state('search', {
            url: '/search?searchTab',
            data: { displayName: 'Search' },
            reloadOnSearch: false,
            views: {
              '': {
                controller: SearchCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.html'
              },
              'search-material@search': {
                controller: SearchMaterialCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.material.html'
              },
              'search-media@search': {
                controller: SearchMediaCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.media.html'
              }
            }
          }).state('materialProgramming', {
            url: '/materials/:materialId/chapters/:chapterId/programming?fromChapter&toChapter',
            views: {
              '': {
                controller: MaterialProgrammingCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.material.programming.html'
              }
            }
          }).state('newMedia', {
            url: '/newMedia?currentId',
            reload: true,
            views: {
              '': {
                controller: NewBaseCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.html'
              },
              'new-media@newMedia': {
                controller: NewMediaCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.media.html'
              },
              'new-material@newMedia': {
                controller: NewMediaMaterialCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.material.html'
              },
              'new-plus-detail@newMedia': {
                controller: NewMediaPlusDetailCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.plus.detail.html'
              },
              'new-segments@newMedia': {
                controller: NewMediaSegmentCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.segment.html'
              },
              'new-audio@newMedia': {
                controller: NewMediaAudioCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.audio.html'
              },
              'new-subtitles@newMedia': {
                controller: NewSubtitleCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.subtitle.html'
              },
              'new-graphics@newMedia': {
                controller: NewMediaGraphicCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.graphic.html'
              },
              'new-rejections@newMedia': {
                controller: NewMediaRejectionCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.rejection.html'
              },
              'new-ratings@newMedia': {
                controller: NewMediaRatingCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.rating.html'
              }
            }
          }).state('newMedia.summary', {
            url: '/:id/summary',
            views: {
              '@': {
                controller: NewMediaSummaryCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.summary.html'
              }
            }
          }).state('searchMaterialResults', {
            url: '/materials?materialId&materialTitle&materialType&chapterId&chapterTitle&fromChapter&toChapter&mediaId&episodeId&mediaMaterialStatus',
            views: {
              '': {
                controller: SearchMaterialResultsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.material.results.html'
              }
            }
          }).state('searchResults', {
            url: '/mediaMaterials?mediaMaterialsListpage&mediaMaterialsListmax&materialId&chapterId&chapterTitle&fromChapter&toChapter&materialTitle&materialType&cid&mediaId&mediaFormat&mediaType&mediaStatus&createdBy&createdOnFrom&createdOnTo&network&feed&episodeId&mediaMaterialStatus',
            views: {
              '': {
                controller: SearchResultsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.html'
              }
            }
          }).state('searchResults.detail', {
            url: '/:id/media/:currentId',
            views: {
              'mm-results-detail@searchResults': {
                controller: SearchResultsDetailCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.detail.html'
              },
              'mm-results-detail-media@searchResults': {
                controller: SearchResultsDetailMediaCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.detail.media.html'
              },
              'mm-results-resources-audios@searchResults': {
                controller: SearchResultsResourcesAudiosCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.detail.resources.audios.html'
              },
              'mm-results-resources-subtitles@searchResults': {
                controller: SearchResultsResourcesSubtitlesCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.detail.resources.subtitles.html'
              },
              'mm-results-resources-graphics@searchResults': {
                controller: SearchResultsResourcesGraphicsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.detail.resources.graphics.html'
              },
              'mm-results-tabs-segments@searchResults': {
                controller: SearchResultsTabsSegmentsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.segments.html'
              },
              'mm-results-tabs-ratings@searchResults': {
                controller: SearchResultsTabsRatingsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.ratings.html'
              },
              'mm-results-tabs-rejections@searchResults': {
                controller: SearchResultsTabsRejectionsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.rejections.html'
              },
              'mm-results-tabs-sot@searchResults': {
                controller: SearchResultsTabsSotCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.sot.html'
              },
              'mm-results-tabs-medias@searchResults': {
                controller: SearchResultsTabsMediasCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.medias.html'
              },
              'mm-results-technicals-state@searchResults': {
                controller: SearchResultsTabsTechnicalCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.search.results.tabs.technical.html'
              }
            }
          }).state('searchResults.detail.rejectionCrud', {
            url: '/rejection',
            views: {
              'mm-results-tabs-rejections@searchResults': {
                controller: RejectionCrudCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.rejection.crud.html'
              }
            }
          }).state('searchResults.detail.mediaResourcesEdit', {
            url: '/audioEdit?:resourceType&:resourceId',
            views: {
              'mm-results-resources-audios@searchResults': {
                controller: MediaResourcesEditCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.media.resources.edit.html'
              }
            }
          }).state('searchResults.detail.mediaSubtitlesEdit', {
            url: '/mediamaterials/:id/subtitlesEdit?:resourceType&:resourceId',
            views: {
              'mm-results-resources-subtitles@searchResults': {
                controller: MediaResourcesEditCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.media.resources.edit.html'
              }
            }
          }).state('searchResults.detail.mediaGraphicEdit', {
            url: '/mediamaterials/:id/graphicEdit?:resourceType&:resourceId',
            views: {
              'mm-results-resources-graphics@searchResults': {
                controller: MediaResourcesEditCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.media.resources.edit.html'
              }
            }
          }).state('viewVirtualSegment', {
            url: '/viewVirtualSegment/:id?editFirst',
            views: {
              '': {
                controller: ViewVirtualSegment,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.new.media.virtual.segment.view.html'
              }
            }
          }).state('mediaEdit', {
            url: '/media/:id?mediaMaterialId&detailCid&materialId&chapterId&materialTitle&cid&mediaId&mediaFormat&mediaType',
            params: {
              'backToState': {
                state: 'search',
                params: {}
              }
            },
            views: {
              '': {
                controller: MediaEditCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.media.edit.html'
              }
            }
          }).state('materialDetail', {
            url: '/materialDetail/:materialId/chapters/:chapterId?chaptersmax&chapterspage',
            params: {
              'backToState': {
                state: 'searchResults',
                params: {}
              }
            },
            views: {
              '': {
                controller: MaterialDetailCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.material.detail.html'
              }
            }
          }).state('materialDetailRatings', {
            url: '/materialDetailRatings/:materialId',
            params: {
              'backToState': {
                state: 'materialDetail',
                params: {}
              }
            },
            views: {
              '': {
                controller: MaterialDetailRatingsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.material.detail.ratings.html'
              }
            }
          }).state('materialDetailChapterRatings', {
            url: '/materialDetailChapterRatings/:materialId?chapterId',
            params: {
              'backToState': {
                state: 'materialDetail',
                params: {}
              }
            },
            views: {
              '': {
                controller: MaterialDetailChapterRatingsCtrl,
                controllerAs: 'vm',
                templateUrl: 'home/views/med.material.detail.chapter.ratings.html'
              }
            }
          });
        }];

        return routerConfig;
      };

      _export('default', mediaroutes);
    }
  };
});
//# sourceMappingURL=med.router.cfg.js.map
