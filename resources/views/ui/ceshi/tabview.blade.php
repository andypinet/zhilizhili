<style>
    .swipe {
        overflow: hidden;
        visibility: hidden;
        position: relative;
    }
    .swipe-wrap {
        overflow: hidden;
        position: relative;
    }
    .swipe-wrap .swipe__item {
        float:left;
        width:100%;
        height:100%;
        position: relative;
    }
</style>
<div id="tab" class="layout flex full-height vertical vertical-center tabview">
    <div class="layout__item">
        <div class="tab-bar tab-bar--basic tabview__tab-bar">
            <div class="layout flex horizontal">
                @for($i = 0; $i < 3; $i++)
                    <div class="layout__item flex-1 tab-bar__item tabview__tab-bar-item" tocuh-action="none">
                        <div class="layout flex full-height vertical horizontal-center vertical-center">
                            <div class="layout__item">
                                tab <% $i+1 %>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>
    </div>
    <div class="layout__item flex-1 utility-pos-relative">
        <div class="layout full-parent utility-pos-absolute">
            <div class='full-parent swipe tabview__swipe'>
                <div class='full-parent swipe-wrap'>
                    <div class="swipe__item">1</div>
                    <div class="swipe__item">2</div>
                    <div class="swipe__item">3</div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        new window.TabView("#tab");
    });
</script>