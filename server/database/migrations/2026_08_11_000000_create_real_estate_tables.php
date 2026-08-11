<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Projects Table
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('location');
            $table->string('total_area');
            $table->string('type'); // Residential, High-Rise, Commercial
            $table->string('image');
            $table->text('gallery')->nullable(); // JSON list of images
            $table->string('brochure')->nullable();
            $table->string('status')->default('Active Development'); // Active Development, Completed, Upcoming
            $table->timestamps();
        });

        // 2. Plots Table
        Schema::create('plots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('size'); // 5 Marla, 10 Marla, 1 Kanal, etc.
            $table->string('type')->default('Residential'); // Residential, Commercial
            $table->decimal('price', 15, 2);
            $table->integer('installment_months')->default(36);
            $table->decimal('down_payment', 15, 2);
            $table->decimal('monthly_installment', 15, 2);
            $table->string('status')->default('available'); // available, booked, pending
            $table->timestamps();
        });

        // 3. Bookings Table
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plot_id')->constrained()->onDelete('cascade');
            $table->date('booking_date');
            $table->string('status')->default('pending'); // pending, approved, cancelled
            $table->string('payment_status')->default('unpaid'); // unpaid, partial, paid
            $table->text('installment_plan')->nullable(); // JSON structure for payments tracking
            $table->timestamps();
        });

        // 4. Inquiries Table
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null');
            $table->string('status')->default('new'); // new, replied, closed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('plots');
        Schema::dropIfExists('projects');
    }
};
