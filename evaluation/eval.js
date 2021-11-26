async function peval () {
  try {
    let evaluations = await fetch (
      ``
    );

    let data_eval = await evaluations.json ();
    console.log ('data_eval:', data_eval);
  } catch (e) {
    console.log (e);
  }
}

peval2 ();

function peval2 () {
  fetch ('http://127.0.0.1:2344/evaluations')
    .then (function (res) {
      return res.json ();
    })
    .then (function (res) {
      console.log (res);
    });
}
