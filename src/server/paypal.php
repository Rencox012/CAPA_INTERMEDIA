<?php

global $client, $secret, $port,$base ;
$client = 'ASeMX1ESeAMGZeauBcuPuLJ8elWYzxtRDTjR4sL5awWYc-y4181-qNkh9qHZDs5y2eYm9J24pzns4w0u';
$secret = 'EBNTcXEKT2pOw-spBzj0ogzLZq8CM5w6DrorBGk-sRbwIl6N8TlBCFJnsLo8vDjXsCuvSLJABuKiDg-v';
$port = 8888;
$base = "https://api-m.sandbox.paypal.com";

function generateAccessToken($client, $secret, $base){
    //encode the client and secret in base 64
    $encoded = base64_encode($client . ":" . $secret);

    //initialize the curl
    $ch = curl_init();

    //set the url
    curl_setopt($ch, CURLOPT_URL, $base . "/v1/oauth2/token");

    //set the headers
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Basic ' . $encoded,
        'Content-Type: application/x-www-form-urlencoded'
    ));

    //set the post request
    curl_setopt($ch, CURLOPT_POST, 1);

    //set the post fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //execute the request
    $result = curl_exec($ch);

    //close the connection
    curl_close($ch);

    //decode the result
    $result = json_decode($result, true);

    //return the access token
    return $result['access_token'];
    
}

function handleResponse($response, $httpStatusCode) {
    try {
        $jsonResponse = json_decode($response, true);
        return [
            'jsonResponse' => $jsonResponse,
            'httpStatusCode' => $httpStatusCode
        ];
    } catch (Exception $e) {
        throw new Exception("Error decoding JSON response: " . $e->getMessage());
    }
}

function createOrder($cart, $client, $secret, $base){
    $accessToken = generateAccessToken($client, $secret, $base);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $base . "/v2/checkout/orders");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
    ));
    curl_setopt($ch, CURLOPT_POST, 1);

    $data = [
        'intent' => 'CAPTURE',
        'purchase_units' => [
            [
                'amount' => [
                    'currency_code' => 'USD',
                    'value' => '220.00'
                ]
            ]
        ]
    ];

    $data = json_encode($data);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    $final_result = handleResponse($result, $httpStatusCode);

    // Log in log.txt the result
    $log = fopen('log.txt', 'a');
    fwrite($log, date("Y-m-d h:i:sa") . "\n");
    fwrite($log, "Result before Handling the result: " . $result . "\n");
    fwrite($log, "Result after Handling the result: " . json_encode($final_result) . "\n");
    fclose($log);

    return $final_result;

}

function captureOrder($orderID, $client, $secret, $base){
    $accessToken = generateAccessToken($client, $secret, $base);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $base . "/v2/checkout/orders/" . $orderID . "/capture");

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
    ));

    curl_setopt($ch, CURLOPT_POST, 1);

    $data = [
        'note_to_payer' => 'Contact us for any questions on your order.',
        'amount' => [
            'currency_code' => 'USD',
            'value' => '220.00'
        ]
    ];

    $data = json_encode($data);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);

    curl_close($ch);

    $final_result = handleResponse($result);

    return $final_result;
}

//Wait for the request to be made
//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

$_method = $_SERVER['REQUEST_METHOD'];

switch($_method){
    case 'POST':
        if(strpos($_SERVER['REQUEST_URI'], '/server/paypal.php/createOrder') !== false){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['cart'])){
                $cart = $data['cart'];
                $result = createOrder($cart, $client, $secret, $base);
                if($result['httpStatusCode'] == 201){
                    header('HTTP/1.1 201 Created');
                    echo json_encode($result['jsonResponse']);
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Error creating order']);
                }
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Cart is required']);
            }
        }
        if(strpos($_SERVER['REQUEST_URI'], '/server/paypal.php/captureOrder') !== false){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['orderID'])){
                $orderID = $data['orderID'];
                $result = captureOrder($orderID, $client, $secret, $base);
                if($result['httpStatusCode'] == 201){
                    header('HTTP/1.1 201 Created');
                    echo json_encode($result['jsonResponse']);
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Error capturing order']);
                }
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Order ID is required']);
            }
        }
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['message' => 'Method not allowed']);
        break;
}