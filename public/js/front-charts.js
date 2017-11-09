/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Front Charts Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/********************************/
/***** FRONT CHARTS HANDLER *****/
/********************************/

const FrontChartsHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var String _id poll's id
   */

  var _id

  /************************************************************/
  /************************************************************/

  /**********/
  /********** GET DATA **********/
  /**********/

  _getData = () => {
    return $.ajax({
      url: window.location.origin + '/polls/' + _id,
      type: 'GET',
      cache: false,
      dataType: 'json',
      succes: (result) => {
        return {error: null, data: result};
      },
      error: (err) => {
        return {error: err};
      }
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** DISPLAY CHART **********/
  /**********/

  _displayChart = (data) => {
    const ctx = document.getElementById("chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: data
    })
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** SET ID **********/
    /**********/

    setId: (id) => {
      _id = id
    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** GENERATE CHART **********/
    /**********/

    generateChart: () => {
      _getData().then((data) => {
        console.log(data)
        _displayChart(data)
      }).catch((err) => {
        console.warn('Error during chart generation..')
        console.error(err)
      })
    }
      
  }

}
