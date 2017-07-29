const form = document.querySelector('form');

const from = document.querySelector('#lang1').value,
    	dest = document.querySelector('#lang2').value,
    	phrase = document.querySelector('#phrase').value,
    	ul = document.querySelector('#translationsOutput');

form.addEventListener('submit', e => {
    //input - button - select - textarea - fieldset
    e.preventDefault();
    const script = document.createElement('script');
    // api request
    script.setAttribute('src', `https://glosbe.com/gapi/translate?from=${from}&dest=${dest}&format=json&phrase=${phrase}&pretty=true&callback=seeResults`);
    const div = document.querySelector('#json-scripts');
    div.innerHTML = ' '; // clean for not repeat scripts, better ways to do it? yes!
    div.appendChild(script);

});

function seeResults(res) {
    ul.innerHTML = '';
    let word = document.querySelector('#word-active').innerText = phrase; // results for: word!
    if (from != dest) {
        if (!phrase.includes(' ')) {
            let translations = res.tuc;
            if (res.tuc.length <= 0) {
                ul.innerHTML = '<h4 style="color: red">Not translations found!</h4>';
            } else {
                translations.forEach(el => {
                    // if the element have any phrase/trans
                    if (el.phrase) {
                        let li = document.createElement('li');
                        li.innerText = el.phrase.text;
                        ul.appendChild(li);
                    }
                });
            }
        } else {
            alert('Must be one word!');
        }
    } else {
        alert('Cannot translate in the same language!');
    }
} // close function
