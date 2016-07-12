'use strict';

import SearchCtrl from '../../home/scripts/controllers/med.search.ctrl';
import SearchMediaCtrl from '../../home/scripts/controllers/med.search.media.ctrl';
import SearchMaterialCtrl from '../../home/scripts/controllers/med.search.material.ctrl';
import SearchMaterialResultsCtrl from '../../home/scripts/controllers/med.search.material.results.ctrl';
import SearchResultsCtrl from '../../home/scripts/controllers/med.search.results.ctrl';
import SearchResultsDetailCtrl from '../../home/scripts/controllers/med.search.results.detail.ctrl';//Ctrl card material
import SearchResultsDetailMediaCtrl from '../../home/scripts/controllers/med.search.results.detail.media.ctrl';//Ctrl card media
import SearchResultsResourcesAudiosCtrl from '../../home/scripts/controllers/med.search.results.detail.resources.audios.ctrl';//Ctrl card audios
import SearchResultsResourcesSubtitlesCtrl from '../../home/scripts/controllers/med.search.results.detail.resources.subtitles.ctrl';//Ctrl card subtitles
import SearchResultsResourcesGraphicsCtrl from '../../home/scripts/controllers/med.search.results.detail.resources.graphics.ctrl';//Ctrl card graphics
import MaterialDetailCtrl from  '../../home/scripts/controllers/med.material.detail.ctrl';
import MaterialDetailRatingsCtrl from  '../../home/scripts/controllers/med.material.detail.ratings.ctrl';
import MaterialDetailChapterRatingsCtrl from  '../../home/scripts/controllers/med.material.detail.chapter.ratings.ctrl';


import NewBaseCtrl from '../../home/scripts/controllers/med.new.base.ctrl.js';
import NewMediaCtrl from '../../home/scripts/controllers/med.new.media.ctrl.js';
import NewMediaMaterialCtrl from '../../home/scripts/controllers/med.new.media.material.ctrl.js';
import NewMediaPlusDetailCtrl from '../../home/scripts/controllers/med.new.media.plus.detail.ctrl.js';
import NewMediaSegmentCtrl from '../../home/scripts/controllers/med.new.media.segment.ctrl.js';
import NewMediaAudioCtrl from '../../home/scripts/controllers/med.new.media.audio.ctrl.js';
import NewSubtitleCtrl from '../../home/scripts/controllers/med.new.media.subtitle.ctrl.js';
import NewMediaGraphicCtrl from '../../home/scripts/controllers/med.new.media.graphic.ctrl.js';
import NewMediaRejectionCtrl from '../../home/scripts/controllers/med.new.media.rejection.ctrl.js';
import NewMediaRatingCtrl from '../../home/scripts/controllers/med.new.media.rating.ctrl.js';
import NewMediaSummaryCtrl from '../../home/scripts/controllers/med.new.media.summary.ctrl.js';
import ViewVirtualSegment from '../../home/scripts/controllers/med.new.media.view.virtual.segment.ctrl.js';

import SearchResultsTabsSegmentsCtrl from '../../home/scripts/controllers/med.search.results.tabs.segments.ctrl';
import SearchResultsTabsRatingsCtrl from '../../home/scripts/controllers/med.search.results.tabs.ratings.ctrl';
import SearchResultsTabsRejectionsCtrl from '../../home/scripts/controllers/med.search.results.tabs.rejections.ctrl';
import SearchResultsTabsSotCtrl from '../../home/scripts/controllers/med.search.results.tabs.sot.ctrl';
import SearchResultsTabsMediasCtrl from '../../home/scripts/controllers/med.search.results.tabs.medias.ctrl';
import SearchResultsTabsTechnicalCtrl from '../../home/scripts/controllers/med.search.results.tabs.technical.ctrl';

import MediaEditCtrl from '../../home/scripts/controllers/med.media.edit.ctrl';
import MediaResourcesEditCtrl from '../../home/scripts/controllers/med.media.resources.edit.ctrl';
import RejectionCrudCtrl from '../../home/scripts/controllers/med.rejection.crud.ctrl.js';
import MaterialProgrammingCtrl from '../../home/scripts/controllers/med.material.programming.ctrl.js';

let mediaroutes = () => {

  let routerConfig = [
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {

      $urlRouterProvider.otherwise(($injector)=> {
        $injector.get('$state').go('search');
      });

      $stateProvider
        .state('search', {
          url: '/search?searchTab',
          data: { displayName : 'Search' },
          reloadOnSearch: false,
          views: {
            '':{
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
        })
        .state('materialProgramming',{
          url: '/materials/:materialId/chapters/:chapterId/programming?fromChapter&toChapter',
          views: {
            '': {
              controller: MaterialProgrammingCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.material.programming.html'
            }
          }
        })
        .state('newMedia',{
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
        })
        .state('newMedia.summary',{
          url: '/:id/summary',
          views: {
            '@': {
              controller: NewMediaSummaryCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.new.media.summary.html'
            }
          }
        })
        .state('searchMaterialResults',{
          url: '/materials?materialId&materialTitle&materialType&chapterId&chapterTitle&fromChapter&toChapter&mediaId&episodeId&mediaMaterialStatus',
          views: {
            '': {
              controller: SearchMaterialResultsCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.search.material.results.html'
            }
          }
        })
        .state('searchResults', {
          url: '/mediaMaterials?mediaMaterialsListpage&mediaMaterialsListmax&materialId&chapterId&chapterTitle&fromChapter&toChapter&materialTitle&materialType&cid&mediaId&mediaFormat&mediaType&mediaStatus&createdBy&createdOnFrom&createdOnTo&network&feed&episodeId&mediaMaterialStatus',
          views: {
            '': {
              controller: SearchResultsCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.search.results.html'
            }
          }
        })
        .state('searchResults.detail', {
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
        })
        .state('searchResults.detail.rejectionCrud', {
          url: '/rejection',
          views: {
            'mm-results-tabs-rejections@searchResults': {
              controller: RejectionCrudCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.rejection.crud.html'
            }
          }
        })
        .state('searchResults.detail.mediaResourcesEdit', {
          url: '/audioEdit?:resourceType&:resourceId',
          views: {
            'mm-results-resources-audios@searchResults': {
              controller: MediaResourcesEditCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.media.resources.edit.html'
            }
          }
        })
        .state('searchResults.detail.mediaSubtitlesEdit', {
          url: '/mediamaterials/:id/subtitlesEdit?:resourceType&:resourceId',
          views: {
            'mm-results-resources-subtitles@searchResults': {
              controller: MediaResourcesEditCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.media.resources.edit.html'
            }
          }
        })
        .state('searchResults.detail.mediaGraphicEdit', {
          url: '/mediamaterials/:id/graphicEdit?:resourceType&:resourceId',
          views: {
            'mm-results-resources-graphics@searchResults': {
              controller: MediaResourcesEditCtrl,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.media.resources.edit.html'
            }
          }
        })
        .state('viewVirtualSegment', {
          url: '/viewVirtualSegment/:id?editFirst',
          views: {
            '': {
              controller: ViewVirtualSegment,
              controllerAs: 'vm',
              templateUrl: 'home/views/med.new.media.virtual.segment.view.html'
            }
          }
        })
        .state('mediaEdit', {
          url: '/media/:id?mediaMaterialId&detailCid&materialId&chapterId&materialTitle&cid&mediaId&mediaFormat&mediaType',
          params: {
            'backToState': {
              state:'search',
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
        })
        .state('materialDetail', {
          url: '/materialDetail/:materialId/chapters/:chapterId?chaptersmax&chapterspage',
          params: {
            'backToState': {
              state:'searchResults',
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
        })
        .state('materialDetailRatings', {
          url: '/materialDetailRatings/:materialId',
          params: {
            'backToState': {
              state:'materialDetail',
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
        })
        .state('materialDetailChapterRatings', {
          url: '/materialDetailChapterRatings/:materialId?chapterId',
          params: {
            'backToState': {
              state:'materialDetail',
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
        })
      ;
    }];

  return routerConfig;

};

export default mediaroutes;
