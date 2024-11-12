<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link href="../output.css" rel="stylesheet">
</head>
    <body class = "bg-page-background text-white h-screen overflow-y-scroll">
    <div id="navbar-container">
        <script type="module">
            import NavBar from "../components/ui/NavBarLanding.js";
            import NavBarMobile from "../components/ui/NavBarLanding-Mobile.js";
            import {assignFunctions} from "../components/ui/NavBarLanding.js";

            //if the user is on mobile, render the mobile navbar
            if (window.innerWidth <= 768) {
                const navbarContainer = document.getElementById('navbar-container');
                navbarContainer.innerHTML = NavBarMobile().render();
            }
            else{
                const navbarContainer = document.getElementById('navbar-container');
                navbarContainer.innerHTML = NavBar().render();
            }
            assignFunctions();
        </script>
    </div>
    <main class="flex h-[calc(100vh-64px)]">
        <!-- Lista de chats -->
        <div class="w-1/4 bg-gray-800 overflow-y-auto">
            <div id="chat-list" class="p-4 space-y-4">
                <!-- Los chats se insertarán aquí dinámicamente -->
            </div>
        </div>
        <!-- Área de chat -->
        <div class="w-3/4 flex flex-col">
            <!-- Barra superior del chat -->
            <div id="chat-header" class="bg-gray-700 p-4 flex items-center">
                <!-- La información del vendedor se insertará aquí -->
            </div>
            <!-- Mensajes del chat -->
            <div id="chat-messages" class="flex-grow overflow-y-auto p-4 space-y-4 flex flex-col" key ="" productoKey ="">
                <!-- Los mensajes se insertarán aquí dinámicamente -->
            </div>
            <!-- Barra de entrada de mensajes -->
            <div id="input-bar" key="" class="bg-gray-700 p-4 flex items-center">
                <input type="text" id="message-input" class="flex-grow bg-gray-600 text-white rounded-l-lg p-2" placeholder="Escribe un mensaje...">
                <button id="create-form-btn" class="bg-blue-500 text-white p-2 rounded-none">Crear Cotización</button>
                <button id="send-message-btn" class="bg-green-500 text-white p-2 rounded-r-lg">Enviar</button>
            </div>
        </div>
        <script type ="module">
            import messagesRenderer from "../components/ui/chat/chat-main.js";
            import {assignListeners} from "../components/ui/chat/chat-main.js";
            import {pagando} from "../components/ui/chat/chat-main.js";

            await messagesRenderer().renderMain();
            assignListeners();

            //attach a timer to render the messages every 2 seconds if chat-messages key is not undefined or null
            setInterval(async () => {
                if (document.getElementById('chat-messages') !== null) {
                    const messagesContainer = document.getElementById('chat-messages');
                    if (messagesContainer.getAttribute('key') === null || messagesContainer.getAttribute('key') === undefined || messagesContainer.getAttribute('key') === '') {
                        return;
                    }
                    const conversationID = messagesContainer.getAttribute('key');
                    const productKey = messagesContainer.getAttribute('productoKey');
                    await messagesRenderer().renderConversationMessages(conversationID, productKey);
                    assignListeners();
                }
            }, 2000);
        </script>
    </main>

    <!-- Modal para crear cotización -->
    <div id="quote-modal" class="hidden z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    </div>



    </body>
</html>
