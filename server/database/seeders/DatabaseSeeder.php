<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Plot;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Users
        $admin = User::create([
            'name' => 'Admin Officer',
            'email' => 'admin@faisaltown.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin'
        ]);

        $user = User::create([
            'name' => 'Syed Hamza',
            'email' => 'user@example.com',
            'password' => Hash::make('user123'),
            'role' => 'user'
        ]);

        // 2. Seed Projects
        $p1 = Project::create([
            'name' => 'Faisal Town (Phase I)',
            'slug' => 'faisal-town-phase-1',
            'description' => 'Faisal Town Phase I is an elite residential society located near the Fateh Jang Interchange of the M-1 Motorway. Offering premium facilities, wide paved roads, underground electricity, state-of-the-art security, and luxurious commercial centers.',
            'location' => 'Fateh Jang Interchange, M-1 Motorway, Islamabad',
            'total_area' => '12,000 Kanal',
            'type' => 'Residential',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            'gallery' => [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80'
            ],
            'brochure' => '/brochures/faisal_town_p1.pdf',
            'status' => 'Completed'
        ]);

        $p2 = Project::create([
            'name' => 'Faisal Town (Phase II)',
            'slug' => 'faisal-town-phase-2',
            'description' => 'Faisal Town Phase II is a spectacular expansion situated right next to the Thalian Interchange of the M-2 Motorway. Designed to cater to the rapid growth of the twin cities, Phase II offers massive residential sectors and premium standard amenities.',
            'location' => 'Thalian Interchange, M-2 Motorway, Rawalpindi/Islamabad',
            'total_area' => '25,000 Kanal',
            'type' => 'Residential',
            'image' => 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
            'gallery' => [
                'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
            ],
            'brochure' => '/brochures/faisal_town_p2.pdf',
            'status' => 'Active Development'
        ]);

        $p3 = Project::create([
            'name' => 'Faisal Hills',
            'slug' => 'faisal-hills',
            'description' => 'Faisal Hills is situated in the ancient city of Taxila, surrounded by the beautiful Margalla Hills. Offering peace, scenic views, and natural landscapes, Faisal Hills features sectors equipped with parks and schools.',
            'location' => 'Main G.T. Road, Taxila, Islamabad GT Road',
            'total_area' => '18,000 Kanal',
            'type' => 'Residential',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
            'gallery' => [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
            ],
            'brochure' => '/brochures/faisal_hills.pdf',
            'status' => 'Active Development'
        ]);

        $p4 = Project::create([
            'name' => 'Faisal Jewel',
            'slug' => 'faisal-jewel',
            'description' => 'Faisal Jewel is a landmark high-rise mixed-use luxury tower in the heart of Islamabad F-10 Markaz. It combines ultra-modern residential penthouses, retail outlets, and corporate office spaces.',
            'location' => 'F-10 Markaz, Islamabad',
            'total_area' => '5 Kanal Plot, 32 Storey Tower',
            'type' => 'High-Rise',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            'gallery' => [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
            ],
            'brochure' => '/brochures/faisal_jewel.pdf',
            'status' => 'Upcoming'
        ]);

        // 3. Seed Plots
        // Faisal Town Phase 1 plots
        Plot::create(['project_id' => $p1->id, 'size' => '5 Marla', 'type' => 'Residential', 'price' => 3500000, 'installment_months' => 36, 'down_payment' => 700000, 'monthly_installment' => 65000, 'status' => 'available']);
        Plot::create(['project_id' => $p1->id, 'size' => '10 Marla', 'type' => 'Residential', 'price' => 6500000, 'installment_months' => 36, 'down_payment' => 1300000, 'monthly_installment' => 120000, 'status' => 'available']);
        Plot::create(['project_id' => $p1->id, 'size' => '4 Marla', 'type' => 'Commercial', 'price' => 9500000, 'installment_months' => 36, 'down_payment' => 2000000, 'monthly_installment' => 180000, 'status' => 'available']);

        // Faisal Town Phase 2 plots
        Plot::create(['project_id' => $p2->id, 'size' => '5.5 Marla', 'type' => 'Residential', 'price' => 2900000, 'installment_months' => 48, 'down_payment' => 580000, 'monthly_installment' => 40000, 'status' => 'available']);
        Plot::create(['project_id' => $p2->id, 'size' => '8 Marla', 'type' => 'Residential', 'price' => 3800000, 'installment_months' => 48, 'down_payment' => 760000, 'monthly_installment' => 52000, 'status' => 'available']);
        Plot::create(['project_id' => $p2->id, 'size' => '10.8 Marla', 'type' => 'Residential', 'price' => 5200000, 'installment_months' => 48, 'down_payment' => 1040000, 'monthly_installment' => 72000, 'status' => 'available']);
        Plot::create(['project_id' => $p2->id, 'size' => '5 Marla', 'type' => 'Commercial', 'price' => 11000000, 'installment_months' => 48, 'down_payment' => 2200000, 'monthly_installment' => 150000, 'status' => 'available']);

        // Faisal Hills plots
        Plot::create(['project_id' => $p3->id, 'size' => '5 Marla', 'type' => 'Residential', 'price' => 2600000, 'installment_months' => 36, 'down_payment' => 520000, 'monthly_installment' => 48000, 'status' => 'available']);
        Plot::create(['project_id' => $p3->id, 'size' => '10 Marla', 'type' => 'Residential', 'price' => 4800000, 'installment_months' => 36, 'down_payment' => 960000, 'monthly_installment' => 90000, 'status' => 'available']);

        // Faisal Jewel units
        Plot::create(['project_id' => $p4->id, 'size' => '2-Bed Apartment', 'type' => 'Commercial', 'price' => 14500000, 'installment_months' => 48, 'down_payment' => 2900000, 'monthly_installment' => 200000, 'status' => 'available']);
        Plot::create(['project_id' => $p4->id, 'size' => 'Executive Office', 'type' => 'Commercial', 'price' => 28000000, 'installment_months' => 48, 'down_payment' => 5600000, 'monthly_installment' => 390000, 'status' => 'available']);
    }
}
