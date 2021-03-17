//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

import { Router } from 'express';
import { Organization } from '../business';
import { Repository } from '../business/repository';
import { OrganizationSudo } from '../features/sudo';
import { IContextualRepositoryPermissions } from '../middleware/github/repoPermissions';
import { IDictionary, IProviders } from '../transitional';
import { IndividualContext } from '../user';

// We're great at long variable names at Microsoft!

export interface IAttachCompanySpecificRoutes {
  connectAuthenticatedRoutes: (router: Router, reactRoute: any) => void;
  connectCorporateApiRoutes: (router: Router) => void;
}

export interface ICompanySpecificFeatureOrganizationSudo {
  tryCreateInstance: (providers: IProviders, organization: Organization) => OrganizationSudo;
}

export interface ICompanySpecificFeatures {
  organizationSudo?: ICompanySpecificFeatureOrganizationSudo;
}

export interface ICompanySpecificStartupProperties {
  routes?: IAttachCompanySpecificRoutes;
  middleware?: IAttachCompanySpecificMiddleware;
  administrationSection?: ICorporationAdministrationSection;
  strings?: IAttachCompanySpecificStrings;
  features?: ICompanySpecificFeatures;
}

export interface IAttachCompanySpecificMiddleware {
  repoPermissions?: ICompanySpecificRepoPermissionsMiddlewareCalls;
}

export interface IAttachCompanySpecificStrings {
  largeTeamProtectionDetailsLink: string;
  linkWarningMessages: string[];
  linkInformationMessage: string;
  linkInformationUrl: string;
  linkInformationPolicyLink: string;
  linkInformationMail: string;
  linkInformationHeading: string;
  linkInformationUrlTitle: string;
  linkInformationMailTitle: string;
}

export interface ICorporationAdministrationSection {
  urls: IDictionary<string>;
  setupRoutes?: (router: Router) => void;
}

export interface ICompanySpecificRepoPermissionsMiddlewareCalls {
  afterPermissionsInitialized?: (providers: IProviders, permissions: IContextualRepositoryPermissions, activeContext: IndividualContext) => void;
  afterPermissionsComputed?: (providers: IProviders, permissions: IContextualRepositoryPermissions, activeContext: IndividualContext, repository: Repository) => Promise<void>;
}

export type ICompanySpecificStartupFunction = (config: any, p: IProviders, rootdir: string) => Promise<void>;

export type ICompanySpecificStartup = ICompanySpecificStartupFunction & ICompanySpecificStartupProperties;
