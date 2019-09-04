import {
	Capabilities,
	CodeStreamEnvironment,
	ThirdPartyProviders,
	Unreads,
	VersionCompatibility
} from "@codestream/protocols/agent";
import {
	CSMarker,
	CSMePreferences,
	CSRepository,
	CSStream,
	CSTeam,
	CSUser
} from "@codestream/protocols/api";
import { RequestType } from "vscode-jsonrpc";
import { EditorContext, IpcRoutes, WebviewContext } from "./webview.protocol.common";

export interface BootstrapInHostResponse {
	capabilities: Capabilities;
	configs: {
		[key: string]: any;
	};
	version: string;
	context: Partial<WebviewContext>;
	env?: CodeStreamEnvironment | string;
	ide?: {
		name: string | undefined;
	};
	session: {
		otc?: string;
		userId?: string;
	};
	versionCompatibility?: VersionCompatibility | undefined;
}

export const BootstrapInHostRequestType = new RequestType<
	void,
	BootstrapInHostResponse,
	void,
	void
>(`${IpcRoutes.Host}/bootstrap`);

export interface SignedInBootstrapData extends BootstrapInHostResponse {
	editorContext: EditorContext;

	preferences: CSMePreferences;
	repos: CSRepository[];
	streams: CSStream[];
	teams: CSTeam[];
	users: CSUser[];
	unreads: Unreads;
	providers: ThirdPartyProviders;
}

export interface LogoutRequest {}
export interface LogoutResponse {}
export const LogoutRequestType = new RequestType<LogoutRequest, LogoutResponse, void, void>(
	`${IpcRoutes.Host}/logout`
);

export const ReloadWebviewRequestType = new RequestType<void, void, void, void>(
	`${IpcRoutes.Host}/webview/reload`
);

export interface CompareMarkerRequest {
	marker: CSMarker;
}
export interface CompareMarkerResponse {}

export const CompareMarkerRequestType = new RequestType<
	CompareMarkerRequest,
	CompareMarkerResponse,
	void,
	void
>(`${IpcRoutes.Host}/marker/compare`);

export interface InsertTextRequest {
	text: string;
	marker: CSMarker;
}

export interface InsertTextResponse {}

export const InsertTextRequestType = new RequestType<
	InsertTextRequest,
	InsertTextResponse,
	void,
	void
>(`${IpcRoutes.Host}/marker/inserttext`);

export interface ApplyMarkerRequest {
	marker: CSMarker;
}

export interface ApplyMarkerResponse {}

export const ApplyMarkerRequestType = new RequestType<
	ApplyMarkerRequest,
	ApplyMarkerResponse,
	void,
	void
>(`${IpcRoutes.Host}/marker/apply`);

export interface UpdateConfigurationRequest {
	name: string;
	value: any;
}

export interface UpdateConfigurationResponse {}

export const UpdateConfigurationRequestType = new RequestType<
	UpdateConfigurationRequest,
	UpdateConfigurationResponse,
	void,
	void
>(`${IpcRoutes.Host}/configuration/update`);
