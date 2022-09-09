<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\TwoFactorAuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth:sanctum', 'n2fa'])->get('/two-factor-auth', function () {
    return view('welcome');
})->name('2fa.index');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);

Route::middleware(['guest'])->group(function () {
    
    Route::get('login', function () {
        return view('welcome');
    })->name('login');

    Route::get('password/reset/{token}', function () {
        return view('welcome');
    })->name('password.reset');

    Route::get('forgot-password', function () {
        return view('welcome');
    });

    Route::get('/', function () {
        return view('welcome');
    });

    // Route::post('/login', [AuthController::class, 'login']);
    // Route::post('password/email', [AuthController::class, 'forgotPass']);
    // Route::post('password/update', [AuthController::class, 'resetPass']);

});

Route::middleware(['auth:sanctum', '2fa'])->group(function () {
    Route::get('/reviews', function () {
        return view('welcome');
    });

    Route::get('/staffs', function () {
        return view('welcome');
    });

    Route::get('/dashboard', function () {
        return view('welcome');
    })->name('dashboard');

    Route::get('/account', function () {
        return view('welcome');
    });

    Route::get('/create-user', function () {
        return view('welcome');
    });

    Route::get('/update-user/{id}', function () {
        return view('welcome');
    });

    Route::get('/add-product', function () {
        return view('welcome');
    });

    Route::get('/change-password', function () {
        return view('welcome');
    });

    Route::get('/orders', function () {
        return view('welcome');
    });

    Route::get('/new-order', function () {
        return view('welcome');
    });

    Route::get('/reports', function () {
        return view('welcome');
    });

    Route::get('/reports/monthly-birthday', function () {
        return view('welcome');
    });

    Route::get('/tasks', function () {
        return view('welcome');
    });

    Route::get('/customers', function () {
        return view('welcome');
    });

    Route::get('/payments', function () {
        return view('welcome');
    });

    Route::get('/payments/{id}', function () {
        return view('welcome');
    });


    Route::get('/products', function () {
        return view('welcome');
    });

    Route::get('/kitchen', function () {
        return view('welcome');
    });

    Route::get('/reservations', function () {
        return view('welcome');
    });

    Route::get('/new-reservation', function () {
        return view('welcome');
    });

    Route::get('/update-reservation/{id}', function () {
        return view('welcome');
    });

    Route::get('/marketing', function () {
        return view('welcome');
    });

    Route::get('/inventory', function () {
        return view('welcome');
    });

    Route::get('/delivery', function () {
        return view('welcome');
    });

    Route::get('/delivery/{id}', function () {
        return view('welcome');
    });

    Route::get('/dispatcher', function () {
        return view('welcome');
    });

    Route::get('/new-dispatcher', function () {
        return view('welcome');
    });

    Route::get('/orders/{order_id}/delivery', function () {
        return view('welcome');
    });

    Route::get('/orders/{order_id}/payment', function () {
        return view('welcome');
    });

    Route::get('/orders/{order_id}/delivery/{id}', function () {
        return view('welcome');
    });

    Route::get('/orders/{order_id}/payment{id}', function () {
        return view('welcome');
    });


    Route::get('/update-dispatcher/{id}', function () {
        return view('welcome');
    });

    Route::get('/new-task', function () {
        return view('welcome');
    });

    Route::get('/update-task/{id}', function () {
        return view('welcome');
    });

    Route::get('/new-inventory', function () {
        return view('welcome');
    });

    Route::get('/update-inventory/{id}', function () {
        return view('welcome');
    });

    Route::get('/orders/{id}', function () {
        return view('welcome');
    });

    Route::get('/update-product/{id}', function () {
        return view('welcome');
    });

    Route::prefix('download')->group(function () {
        Route::get('birthday', [DownloadController::class, 'birthday']);
        Route::get('complaint', [DownloadController::class, 'complaint']);
        Route::get('customers', [DownloadController::class, 'customers']);
        Route::get('delivery', [DownloadController::class, 'delivery']);
        Route::get('discount', [DownloadController::class, 'discount']);
        Route::get('incedent', [DownloadController::class, 'incedent']);
        Route::get('inventory', [DownloadController::class, 'inventory']);
        Route::get('payroll', [DownloadController::class, 'payroll']);
        Route::get('quality-check', [DownloadController::class, 'quality_check']);
        Route::get('feedback', [DownloadController::class, 'feedback']);
    });

});