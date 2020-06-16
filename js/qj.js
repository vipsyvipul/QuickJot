$(document).ready(function() {

    //Variables
    var qj_local_key = 'qj_local_key';
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var time_delay = 800;

    /*
        fn = qjDate
        Desc = Prints current date.
        return = none
    */
    function qjDate() {
        var qj_date = new Date();
        $('#qj-date').html(qj_date.getDate() + "  " + monthNames[qj_date.getMonth()] + "  " + qj_date.getFullYear());
    }

    /*
        fn = qjLoad
        Desc = Checks for content availability in local storage.
        return = none
    */
    function qjLoad() {
        var qj_local_content = localStorage.getItem(qj_local_key);
        $('#qj-master').html(qj_local_content);
    }


    //Reflects the changes on all other instances
    window.addEventListener('storage', function(event) {
        if (event.key == qj_local_key) {
            $('#qj-master').html(event.newValue);
        } else if (event.key == 'qj_local_blur_state') {
            qjSetBlurState(event.newValue);
        }

    });


    /*
        fn = qjSave
        Desc = Saves content in local storage.
        return = none
    */
    function qjSave() {
        var qj_content = $('#qj-master').html();
        localStorage.setItem(qj_local_key, qj_content);
    }


    //Saving the content after every 600ms
    setInterval(function() {
        qjSave();
    }, time_delay);


    /*
        fn = qjGetBlurState
        Desc = Gets the blur state of the content
        return = none
        call fn = qjSetBlurState()
    */
    function qjGetBlurState() {
        var qj_local_blur_state = localStorage.getItem('qj_local_blur_state');
        qjSetBlurState(qj_local_blur_state);
    }


    /*
        fn = qjSetBlurState
        parameter = blur_state
        Desc = Sets the blur state of content based on blur_state value passed from qjGetBlurState fn
        return = none
    */
    function qjSetBlurState(blur_state) {
        if (blur_state == 'show') {
            $('button#qj-content-blur').find('img').attr('src', 'images/eye.svg');
            $('#qj-master').removeClass('qj-blur').attr('contenteditable', 'true');
        } else {
            $('button#qj-content-blur').find('img').attr('src', 'images/hidden.svg');
            $('#qj-master').addClass('qj-blur').attr('contenteditable', 'false');
        }
    }


    //Retrieving today's date.
    qjDate();
    //Retrieving content from local storage on page load
    qjLoad();
    //Retrieving blur state
    qjGetBlurState();


    $('button#qj-content-blur').click(function(e) {
        e.preventDefault();
        if ($(this).find('img').attr('src') == 'images/eye.svg') {
            $(this).find('img').attr('src', 'images/hidden.svg');
            $('#qj-master').addClass('qj-blur');
            $('#qj-master').attr('contenteditable', 'false');
            localStorage.setItem('qj_local_blur_state', 'hidden');
        } else {
            $(this).find('img').attr('src', 'images/eye.svg');
            $('#qj-master').removeClass('qj-blur');
            $('#qj-master').attr('contenteditable', 'true');
            localStorage.setItem('qj_local_blur_state', 'show');
        }
    });
});