import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  const body = await request.json();
  const notification = await prisma.notification.create({
    data: body,
  });
  return NextResponse.json(notification);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const notification = await prisma.notification.update({
    where: { id: body.id },
    data: { isRead: true },
  });
  return NextResponse.json(notification);
}