// Element selection (same as querySelectorAll)
const h1s = $('h1'); // document.querySelectorAll('h1')

// Event Listeners
h1s.click(function(e){
    console.log(e);
})  // h1.addEventListener('click', function(e){console.log(e)})

// Stlying
h1s.css('color', 'red'); // h1.style.color = 'red'

// Attributes
console.log($('p').attr('class')) // p.getAttribute('class')
console.log($('p').attr('class', 'something')) // p.setAttribute('class', 'something')

// Data attribute
console.log($('p').data('customprop'));

// Text
$('p').text('New text'); // p.innerText = 'New text'

// Html
$('p').html('<i>new bold text</i>'); // p.innerHTML = '<i>new bold text</i>'

// Fade IN / OUT
$('p').fadeOut();
$('p').fadeIn();

// Show / Hide
h1s.show();
h1s.hide();

// Slide
h1s.slideDown('slow');

// Animations
$('p').animate({'opacity': '0%'}, 3000);

// DOM Manipulation 
console.log('parent', $('p').parent()); // node.parentNode
console.log('next sibling', $('p').next());  // node.nextSibling
console.log('childnen', $('p').children()); // node.children
$('p').append('<h1>dfghjknm</h1>') // node.innerHTML += '<h1>dfghjknm</h1>';

// Ajax
$.ajax({
    type: "GET",
    url: "/myData.txt",
    success: function (response) {
        console.log(response);
    }
});