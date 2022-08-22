<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')
                  ->constrained()->onDelete('cascade');
            $table->foreignId('product_id');
            $table->string('product_name');
            $table->float('product_price')->default(0.00);
            $table->string('product_desc');
            $table->text('product_ingred');
            $table->string('type');
            $table->integer('quantity');
            $table->tinyText('allergies')->nullable();
            $table->tinyText('preference')->nullable();
            $table->string('status')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};
