<div id="tab" class="layout flex full-height vertical vertical-center tabview">
    <div class="layout__item">
        <div class="tab-bar tab-bar--basic tabview__tab-bar">
            <div class="layout flex horizontal vertical-center">
                @for($i = 0; $i < 3; $i++)
                    <div class="layout__item flex-1 tab-bar__item tabview__tab-bar-item" tocuh-action="none">
                        <div class="layout flex full-height vertical horizontal-center vertical-center">
                            <div class="layout__item tabview__tab-bar-item-content">
                                @if($i == 2)
                                    测试sdsds <% $i+1 %>
                                @else
                                    tab <% $i+1 %>
                                @endif
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>
        <div class="animation-bar">
            <div id="animationHandle" class="animation-handle"></div>
        </div>
    </div>
    <div class="layout__item flex-1 utility-pos-relative">
        <div class="layout full-parent utility-pos-absolute">
            <div class='full-parent swipe-view tabview__swipe-view'>
                <div class='full-parent swipe-view-wrap'>
                    <div class="swipe-view__item tabview__swipe-view-item">1</div>
                    <div class="swipe-view__item tabview__swipe-view-item">2</div>
                    <div class="swipe-view__item tabview__swipe-view-item">3</div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        new window.AnimationTabView("#tab");
    });
</script>