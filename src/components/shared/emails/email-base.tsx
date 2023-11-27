import {
	Button,
	Column,
	Container,
	Heading,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import { ReactNode } from "react";

export function EmailBase({
	title,
	children,
}: {
	title: string;
	children?: ReactNode;
}) {
	return (
		<Tailwind>
			<Section>
				<Container className="p-8 flex justify-center items-center">
					<Row>
						<Column>
							<Text className="font-semibold text-3xl w-min">
								Meu
							</Text>
						</Column>
						<Column>
							<Text className="font-semibold text-3xl text-red-500 w-min">
								Novo
							</Text>
						</Column>
						<Column>
							<Text className="font-semibold text-3xl w-min">
								App
							</Text>
						</Column>
					</Row>
				</Container>
				<Container className="bg-primary text-secondary p-8 flex justify-center">
					<Heading className="text-xl font-bold">{title}</Heading>
				</Container>
				<Container className="bg-secondary/50 flex flex-col w-full p-8">
					{children}
				</Container>
				<Container className="bg-primary text-secondary p-4 flex justify-center">
					<Button
						className="text-xs font-medium"
						href={process.env.SITE_URI}
					>
						Ir para o site
					</Button>
				</Container>
			</Section>
		</Tailwind>
	);
}
