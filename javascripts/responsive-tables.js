$(document).ready(function () {
    var switched = false;
    var loaded = false;
    var updateTables = function () {
        if (($(window).width() < 767) && !switched) {
            switched = true;
            $("table.responsive").each(function (i, element) {
                splitTable($(element));
            });
            // stickheader();
            return true;
        }
        else if (switched && ($(window).width() > 767)) {
            switched = false;
            $("table.responsive").each(function (i, element) {
                unsplitTable($(element));
            });
        }
     
       
   
    };


  

    $(window).load(updateTables);
   // $(window).on("redraw", function () { switched = false; updateTables(); }); // An event to listen for
   // $(window).on("resize", updateTables);


   
    //Fixed header...cant get the left right scroll working
    var stickheader = function () {
       
        $("#fixed-header").empty();
        $("#fixed-scrolling-header").empty();

        var tableOffset = $(".responsive").offset().top;
        var $headerscroll = $(".responsive > thead").clone();
        var $header = $(".pinned > table > thead").clone();

        var $fixedScrollingHeader = $("#fixed-scrolling-header").append($headerscroll);
        var $fixedHeader = $("#fixed-header").append($header);
     

        setCellWidths($(".responsive"), $fixedScrollingHeader);

        $(".sticky-header").each(function (i, element) {
            $(".table-wrapper").append(element);
            setCellHeights($(".responsive"), $(element));
           
        })

        $(window).bind("scroll", function () {
            var offset = $(this).scrollTop();

            if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
                $(".sticky-header").show();
                //$fixedScrollingHeader.show();
            }
            else if (offset < tableOffset) {
                $(".sticky-header").hide();
               // $fixedScrollingHeader.hide();
            }
        });

       $(".scrollable.sticky-header").css('width', $(window).width());
    }
    

    function splitTable(original) {
        original.wrap("<div class='table-wrapper' />");

        var copy = original.clone();
        copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        copy.removeClass("responsive");

        var sectionsCopy = original.clone();
        sectionsCopy.find("td:not(.sub-header), th:not(.sub-header)").css("display", "none");
        sectionsCopy.removeClass("responsive");

        original.closest(".table-wrapper").prepend(sectionsCopy);
        original.closest(".table-wrapper").append(copy);       

        copy.wrap("<div class='pinned' />");
        original.wrap("<div class='scrollable' />");
        sectionsCopy.wrap("<div class='sections' />");

        setCellHeights(original, copy);
        setCellHeights(original, sectionsCopy);



    }

    function unsplitTable(original) {
        original.closest(".table-wrapper").find(".pinned").remove();
        original.unwrap();
        original.unwrap();
    }
    function setCellWidths(original, copy) {
        // var tr = original.find('tr'),
        //     tr_copy = copy.find('th'),
        //     widths = [];

        // tr.each(function (index) {
        //     var self = $(this),
        //         tx = self.find('td, th');

        //     tx.each(function () {
        //         var width = $(this).outerWidth(true);
        //         widths[index] = widths[index] || 0;
        //         if (width > widths[index]) widths[index] = width;
        //         // console.log(width);
        //         // widths[index] = 100;
        //     });

        // });

        // tr_copy.each(function (index) {
        //     console.log('copy')
        //         console.log(widths[index])

        //     $(this).width(widths[index]);
        //     $(this).width(100);
        // });
    }
    function setCellHeights(original, copy) {
        var tr = original.find('tr'),
            tr_copy = copy.find('tr'),
            heights = [];

        tr.each(function (index) {
            var self = $(this),
                tx = self.find('th, td');

            tx.each(function () {
                var height = $(this).outerHeight(true);
                heights[index] = heights[index] || 0;
                if (height > heights[index]) heights[index] = height;
            });
        });

        tr_copy.each(function (index) {
            if($(this).outerHeight() > heights[index]){
                heights[index] = $(this).height();
            } else {
                $(this).height(heights[index]);
            }
        });

        tr.each(function(index) {
            var self = $(this),
            tx = self.find('th, td');
            if($(this).height() < heights[index]){
                $(this).height(heights[index]);
            }
        });

    }

});
