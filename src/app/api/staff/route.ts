// src/app/api/staff/route.ts
import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for staff members (in a real app, this would be a database)
let staffMembers = [
  { id: 1, name: "IKK", role: "Chairman", image: "/images/chairman.jpg", bio: "Chairman of the Hip-Hop Foundation, leading the movement with vision and purpose." },
  { id: 2, name: "Martin Angelz", role: "Vice Chairman", image: "/images/vice_chairman martin.jpg", bio: "Vice Chairman driving the mission forward in the hip-hop community." },
  { id: 3, name: "Tuyishime Martin", role: "IT Manager", image: "/images/IT manager.jpg", bio: "Ensuring digital innovation for the movement and technological advancement." },
  { id: 4, name: "Team Management", role: "Operations", image: "/images/team_management.jpg", bio: "Managing team operations and coordination for maximum impact." },
  { id: 5, name: "Alinafe Bvumber", role: "Coordinator", image: "/images/Alinafe Bvumbwe.jpg", bio: "Coordinator managing day-to-day operations and ensuring smooth execution of foundation activities." },
  { id: 6, name: "Leah Perekamoyo", role: "Head of Finance", image: "/images/Leah Perekamoyo.jpg", bio: "Head of Finance overseeing financial operations and ensuring sustainable growth of the foundation." },
  { id: 7, name: "Henderson Paul", role: "Spokesperson", image: "/images/Henderson Paul.png", bio: "Spokesperson representing the foundation and communicating our mission to the public." },
  { id: 8, name: "Romeo Damaso", role: "Creative Director", image: "/images/Romeo Damaso.jpg", bio: "Creative Director leading artistic initiatives and creative projects for the foundation." },
  { id: 9, name: "Manuel Seleman", role: "Head of Security", image: "/images/Manuel Security.jpg", bio: "Head of Security ensuring the safety and security of all foundation events and operations." }
];

export async function GET(request: NextRequest) {
  try {
    // Return all staff members
    return NextResponse.json({ 
      success: true, 
      data: staffMembers 
    });
  } catch (error) {
    console.error('Error fetching staff members:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch staff members' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, role, image, bio } = await request.json();

    // Validate required fields
    if (!name || !role) {
      return NextResponse.json({ 
        success: false, 
        error: 'Name and role are required' 
      }, { status: 400 });
    }

    // Create new staff member
    const newStaff = {
      id: Date.now(), // Generate a unique ID
      name,
      role,
      image: image || '', // Default to empty string if not provided
      bio: bio || '' // Default to empty string if not provided
    };

    staffMembers.push(newStaff);

    return NextResponse.json({ 
      success: true, 
      data: newStaff 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating staff member:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create staff member' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, role, image, bio } = await request.json();

    // Validate required fields
    if (!id || !name || !role) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID, name, and role are required' 
      }, { status: 400 });
    }

    // Find the staff member to update
    const index = staffMembers.findIndex(member => member.id === id);
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Staff member not found' 
      }, { status: 404 });
    }

    // Update the staff member
    staffMembers[index] = {
      id,
      name,
      role,
      image: image || staffMembers[index].image,
      bio: bio || staffMembers[index].bio
    };

    return NextResponse.json({ 
      success: true, 
      data: staffMembers[index] 
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update staff member' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID is required' 
      }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    
    // Find the staff member to delete
    const index = staffMembers.findIndex(member => member.id === numericId);
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Staff member not found' 
      }, { status: 404 });
    }

    // Remove the staff member
    const deletedStaff = staffMembers.splice(index, 1)[0];

    return NextResponse.json({ 
      success: true, 
      data: deletedStaff 
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete staff member' 
    }, { status: 500 });
  }
}