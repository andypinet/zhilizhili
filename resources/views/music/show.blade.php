@extends("base")

@section("head")
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="import" href="/bower_components/iron-list/iron-list.html">
    <link rel="import" href="/bower_components/paper-input/paper-input.html">
    <link rel="import" href="/bower_components/marked-element/marked-element.html">
@endsection

@section("content")
    <view-controller id="index">
        <iron-list id="message" items='[]' as="item">
            <template>
                <div>
                    <h3>name</h3>
                    <marked-element markdown="[[item.content]]">
                        <div class="markdown-html">
                        </div>
                    </marked-element>
                </div>
            </template>
        </iron-list>

        @if (!is_null(Auth::user()))
            <paper-input id="messageInput" on-keyup="handleMessageSend"></paper-input>
            <input id="roomid" type="hidden" value="<% $roomId %>">
        @endif
        <textarea id="safehtml" style="display: none;"></textarea>
    </view-controller>
@endsection

@section("script")
    <script src="/assets/pc/controller/music/show.js"></script>
@endsection