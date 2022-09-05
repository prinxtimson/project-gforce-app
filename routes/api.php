<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\DispatcherController;
use App\Http\Controllers\IncedentController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\QualityCheckController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TaskController;
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

Route::post('/login', [AuthController::class, 'api_login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);
Route::post('/reset-password', [AuthController::class, 'resetPass']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('two-factor-auth', [TwoFactorAuthController::class, 'store'])->name('2fa.store');
Route::get('two-factor-auth/resend', [TwoFactorAuthController::class, 'resend'])->name('2fa.resend');


Route::get('cart/{id}', [CartController::class, 'show']);
Route::post('cart', [CartController::class, 'store']);
//Route::put('cart/{id}', [CartController::class, 'update']);

Route::get('orders/{id}', [OrderController::class, 'show']);
Route::post('orders', [OrderController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::put('/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('delete', [AuthController::class, 'delete']);

    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/discount', [ProductController::class, 'discount']);
    Route::get('products/{id}', [ProductController::class, 'show']);

    Route::get('category', [CategoryController::class, 'index']);
    Route::get('category/{id}', [CategoryController::class, 'show']);

    Route::get('complaint', [ComplaintController::class, 'index']);
    Route::get('complaint/{id}', [ComplaintController::class, 'show']);
    Route::post('complaint', [ComplaintController::class, 'store']);
    Route::put('complaint/{id}', [ComplaintController::class, 'update']);
    Route::delete('complaint/{id}', [ComplaintController::class, 'destroy']);

    Route::get('delivery', [DeliveryController::class, 'index']);
    Route::get('delivery/{id}', [DeliveryController::class, 'show']);
    Route::post('delivery', [DeliveryController::class, 'store']);
    Route::put('delivery/{id}', [DeliveryController::class, 'update']);
    Route::delete('delivery/{id}', [DeliveryController::class, 'destroy']);

    Route::get('incedent', [IncedentController::class, 'index']);
    Route::get('incedent/{id}', [IncedentController::class, 'show']);
    Route::post('incedent', [IncedentController::class, 'store']);
    Route::put('incedent/{id}', [IncedentController::class, 'update']);
    Route::delete('incedent/{id}', [IncedentController::class, 'destroy']);

    Route::get('inventory', [InventoryController::class, 'index']);
    Route::get('inventory/{id}', [InventoryController::class, 'show']);

    Route::get('quality-check', [QualityCheckController::class, 'index']);
    Route::get('quality-check/{id}', [QualityCheckController::class, 'show']);
    Route::post('quality-check', [QualityCheckController::class, 'store']);
    Route::put('quality-check/{id}', [QualityCheckController::class, 'update']);
    Route::delete('quality-check/{id}', [QualityCheckController::class, 'destroy']);

    Route::get('task', [TaskController::class, 'index']);
    Route::get('task/{id}', [TaskController::class, 'show']);
    Route::get('task/mark/{id}', [TaskController::class, 'mark_complete']);
    Route::post('task', [TaskController::class, 'store']);
    Route::put('task/{id}', [TaskController::class, 'update']);
    Route::delete('task/{id}', [TaskController::class, 'destroy']);

    Route::get('reservation', [ReservationsController::class, 'index']);
    Route::get('reservation/{id}', [ReservationsController::class, 'show']);
    Route::get('reservation/cancel/{id}', [ReservationsController::class, 'cancel']);
    Route::get('reservation/uncancel/{id}', [ReservationsController::class, 'uncancel']);
    Route::post('reservation', [ReservationsController::class, 'store']);
    Route::put('reservation/{id}', [ReservationsController::class, 'update']);

    Route::post('make-payment', [PaymentController::class, 'make_payment']);
    Route::get('payment/{id}', [PaymentController::class, 'show']);

    Route::get('review', [ReviewController::class, 'index']);
    Route::get('review/{id}', [ReviewController::class, 'show']);
    Route::post('review', [ReviewController::class, 'store']);
    Route::put('review/{id}', [ReviewController::class, 'update']);
    Route::delete('review/{id}', [ReviewController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::post('orders', [OrderController::class, 'store']);

    Route::get('orders-items', [OrderItemController::class, 'index']);
    Route::get('orders-items/canceled', [OrderItemController::class, 'canceled']);
    Route::get('orders-items/cancel/{id}', [OrderItemController::class, 'cancel']);
    Route::get('orders-items/{id}', [OrderItemController::class, 'show']);
    Route::delete('orders-items/{id}', [OrderItemController::class, 'destroy']);

    Route::get('reports', [ReportController::class, 'report']);
    Route::get('reports/order', [ReportController::class, 'get_order_report']);
    Route::get('reports/most-selling', [ReportController::class, 'get_order_report']);

});

Route::group(['middleware' => ['auth:sanctum', 'role:admin|super-admin']], function () { 
    Route::get('users', [UserController::class, 'index']);
    Route::get('employees', [UserController::class, 'all']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::put('users/disable/{id}', [UserController::class, 'disable']);
    Route::put('users/enable/{id}', [UserController::class, 'enable']);

    Route::get('customers', [UserController::class, 'customers']);
    Route::get('customers/active', [UserController::class, 'active_customers']);
    Route::get('customers/birthday', [UserController::class, 'monthly_birthday']);
    //Route::put('users/approved/{id}', [UserController::class, 'approved']);

    Route::get('reservation/approve/{id}', [ReservationsController::class, 'approve']);
    Route::get('reservation/disapprove/{id}', [ReservationsController::class, 'unapprove']);
    Route::delete('reservation/{id}', [ReservationsController::class, 'destroy']);

    Route::get('cart', [CartController::class, 'index']);
    Route::delete('cart/{id}', [CartController::class, 'destroy']);

    Route::put('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::post('category', [CategoryController::class, 'store']);
    Route::put('category/{id}', [CategoryController::class, 'update']);
    Route::delete('category/{id}', [CategoryController::class, 'destroy']);


    Route::post('inventory', [InventoryController::class, 'store']);
    Route::put('inventory/{id}', [InventoryController::class, 'update']);
    Route::delete('inventory/{id}', [InventoryController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::get('orders/cancel/{id}', [OrderController::class, 'cancel']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);

    Route::get('dispatcher', [DispatcherController::class, 'index']);
    Route::get('dispatcher/{id}', [DispatcherController::class, 'show']);
    Route::post('dispatcher', [DispatcherController::class, 'store']);
    Route::put('dispatcher/{id}', [DispatcherController::class, 'update']);
    Route::delete('dispatcher/{id}', [DispatcherController::class, 'destroy']);

    Route::get('payment', [PaymentController::class, 'index']);
    Route::post('payment', [PaymentController::class, 'create']);
    Route::get('payment/refund/{id}', [PaymentController::class, 'refund']);
});