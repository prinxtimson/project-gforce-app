<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TwoFactorAuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);
Route::post('/reset-password', [AuthController::class, 'resetPass']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('two-factor-auth', [TwoFactorAuthController::class, 'store'])->name('2fa.store');
Route::get('two-factor-auth/resend', [TwoFactorAuthController::class, 'resend'])->name('2fa.resend');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::put('/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('delete', [AuthController::class, 'delete']);

    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/discount', [ProductController::class, 'discount']);
    Route::get('products/{id}', [ProductController::class, 'show']);
    Route::put('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::get('category', [CategoryController::class, 'index']);
    Route::get('category/{id}', [CategoryController::class, 'show']);
    Route::post('category', [CategoryController::class, 'store']);
    Route::put('category/{id}', [CategoryController::class, 'update']);
    Route::delete('category/{id}', [CategoryController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::get('orders/cancel/{id}', [OrderController::class, 'cancel']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);

    Route::get('orders/items', [OrderItemController::class, 'index']);
    Route::get('orders/items/canceled', [OrderItemController::class, 'canceled']);
    Route::get('orders/items/{id}', [OrderItemController::class, 'show']);

    Route::get('reports', [ReportController::class, 'report']);

});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::put('users/disable/{id}', [UserController::class, 'disable']);
    Route::put('users/enable/{id}', [UserController::class, 'enable']);

    Route::get('customers', [UserController::class, 'customers']);
    Route::get('customers/active', [UserController::class, 'active_customers']);
    //Route::put('users/approved/{id}', [UserController::class, 'approved']);

});