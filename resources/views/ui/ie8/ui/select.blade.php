<form action="" class="form">
    <style>
        #test {
            pointer-events: none;
        }
        #select {
            filter: alpha(opacity=0);
            opacity: 0;
        }
    </style>
    <div class="form-group">
        <div class="layout inline-block-center" data-role="group">
            <div class="layout__item layout__item--prefix form-group__item form-group__item--prefix">prefix</div>
            <div class="layout__item layout__item--content form-group__item form-group__item--content">
                <div class="form-select form-select--basic grey" style="position: relative; width: 250px; height: 30px;">
                    <div class="layout" data-role="group">
                        <div select-for="select" class="layout__item layout__item--prefix form-select__item form-select__item--prefix utility-pos-absolute" style="left: 0; top: 0;">prefix</div>
                        <div class="layout__item layout__item--content form-select__item form-select__item--content utility-pos-absolute full-parent" style="z-index: 1">
                            <select id="select" name="select" class="full-parent">
                                <option value="1">select1</option>
                                <option value="2">select2</option>
                                <option value="3" selected>select3</option>
                            </select>
                        </div>
                        <div id="test" class="layout__item layout__item--suffix form-select__item form-select__item--suffix utility-pos-absolute" style="right: 0; top: 0;">suffix</div>
                    </div>
                </div>
            </div>
            <div class="layout__item layout__item--suffix form-group__item form-group__item--suffix">suffix</div>
        </div>
    </div>
    <script type="text/javascript">
        function polyfillSelect(id) {
            var polyfillelement = document.getElementById(id);
            var selectForElement = document.querySelector('[select-for="'+id+'"]');

            if (selectForElement == null) {
                return false;
            }

            var options = polyfillelement.children;
            var index = 0;

            for (var i = 0; i < options.length; i++) {
                var option = options.item(i);
                if (option.getAttribute("selected") == "selected") {
                    index = i;
                }
            }

            var value = options.item(index).value;
            selectForElement.innerHTML = document.querySelector('[value="'+value+'"]').innerHTML;

            document.getElementById(id).addEventListener("change", function(e) {
                var value = e.target.value;
                var selectForElement = document.querySelector('[select-for="'+id+'"]');
                selectForElement.innerHTML = document.querySelector('[value="'+value+'"]').innerHTML;
            }, false);
        }

        polyfillSelect("select");
    </script>
</form>