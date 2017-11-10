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
        return {error: null, data: result}
      },
      error: (err) => {
        return {error: err}
      }
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** GENERATE COLORS **********/
  /**********/

  _generateColors = (size) => {
    let colors = []
    for (let i= 0; i < size; i++) {
      let r = Math.floor(Math.random() * 200)
      let g = Math.floor(Math.random() * 200)
      let b = Math.floor(Math.random() * 200)
      let color = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.75)'
      colors.push(color)
    }
    return colors
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** DISPLAY CHART **********/
  /**********/

  _displayChart = (data) => {
    
    const colors = _generateColors(data.labels.length)
    data.datasets[0].backgroundColor = colors
    data.datasets[0].borderColor = colors
    data.datasets[0].borderWidth = 1

    const ctx = $('#chart')
    const pieChart = new Chart(ctx, {
      type: "doughnut",
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
        _displayChart(data.chartData)
      }).catch((err) => {
        console.warn('Error during chart generation...')
        console.error(err)
      })
    }
      
  }

}
