/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Main
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const Main = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var FrontChart _frontChartsHandler Object that handles charts in front end
   */

  let _frontChartsHandler = FrontChartsHandler()

  /**********/
  /********** HANDLER CHARTS **********/
  /**********/

  _handleCharts = () => {
    
    if ($('canvas#chart').length > 0) {
      _frontChartsHandler.setId($('canvas#chart').attr('data-poll'))
      _frontChartsHandler.generateChart()
    }
    
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LOAD **********/
  /**********/

  _load = () => {
    
    $(window).on('load', () => {
      
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** READY **********/
  /**********/

  _ready = () => {

    $(document).ready(() => {
      _handleCharts()
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {

    init: () => {
      _load()
      _ready()
    }
      
  }

}

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const main = Main()
main.init()
