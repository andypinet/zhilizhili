@extends("base")

@section("head")
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="import" href="/bower_components/iron-list/iron-list.html">
    <link rel="import" href="/bower_components/paper-input/paper-input.html">
    <link rel="import" href="/bower_components/marked-element/marked-element.html">
    <link rel="stylesheet" href="/assets/pc/css/music/show.css">
@endsection

@section("content")
    <view-controller class="music-show" id="index">
        <div class="user-list">
            user list
        </div>

        <div class="content">
            <div class="layout vertical chat">

                <div class="flex-1 chat-list">
                    <div class="chat-list__music">
                        music
                    </div>
                    <div class="chat-list__messages">
                        talk
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
                    </div>
                </div>

                <div class="chat-send">
                    @if (!is_null(Auth::user()))
                        <paper-input id="messageInput" on-keyup="handleMessageSend"></paper-input>
                        <input id="roomid" type="hidden" value="<% $roomId %>">
                    @endif
                </div>

            </div>
        </div>

        <div class="music-list">
            music list
        </div>

        <textarea id="safehtml" style="display: none;"></textarea>
    </view-controller>
@endsection

@section("script")
    <script src="/assets/pc/controller/music/show.js"></script>
@endsection